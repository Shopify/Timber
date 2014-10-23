const gutil = require("gulp-util");
const fs = require("fs");
const path = require("path");
const File = gutil.File;
const PluginError = gutil.PluginError;
const through = require("through2");
const format = require("util").format;
const trim = require("useful-functions.js").trim;
const extend = require("useful-functions.js").extend;
const url = require("url");
const EventEmitter = require('events').EventEmitter;

const PLUGIN_NAME = "gulp-css-import";

function ok() {
	var args = Array.prototype.slice.call(arguments);
	var message = format.apply(null, args)
	gutil.log(PLUGIN_NAME, gutil.colors.green("✔ " + message));
}

function fail() {
	var args = Array.prototype.slice.call(arguments);
	var message = format.apply(null, args)
	gutil.log(PLUGIN_NAME, gutil.colors.red("✘ " + message));
}

function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);
}

var defaults = {};

module.exports = function (options) {
	
	options = options || {};
	var parsedFiles = {};
	var buffer = [];

	function parseLineFactory(filePath, callback) {
		var fileDirectory = path.dirname(filePath);
		return function parseLine(line) {

			var args = Array.prototype.slice.call(arguments);
			var line = args.shift();
			
			var match = line.match(/@import\s+(?:url\()?(.+(?=['"\)]))(?:\))?.*/i);
			var importFile = match && trim(match[1], "'\"");
			
			start:
			if (importFile) {

				if (isUrl(importFile)) {

					components = url.parse(importFile);
					var protocol = trim(components["protocol"], ":");
					if (["http", "https"].indexOf(protocol) == -1) {
						fail("Cannot process file %j, unknown protocol %j.", importFile, protocol);
						break start;
					}
					var http = require(protocol);
					http.get(importFile, function(response) {
						var body = "";
						response.on("data", function(chunk) {
							body += chunk;
						})
						response.on("end", function() {
							callback.apply(null, [null, body].concat(args));
						});
						response.on("error", function(error) {
							callback.apply(null, [error]);
						});
					});
					return;
				}

				var importFilePath = path.normalize(path.join(fileDirectory, importFile));
				fs.exists(importFilePath, existsEnd);
				function existsEnd(exists) {
					fs.readFile(importFilePath, readFileEnd);
					function readFileEnd(error, buffer) {
						if (error) {
							callback.apply(null, [error]);
							return;
						}
						line = buffer.toString();
						parsedFiles[importFilePath] = true;
						callback.apply(null, [null, line].concat(args));
					}
				}
				return;
			}
			
			callback.apply(null, [null, line].concat(args));
		};
	}

	function fileContents(file, encoding, callback) {

		if (file.path === null) {
			throw new Error("File.path is null.");
		}

		if (!file.isBuffer()) {
			throw new PluginError(PLUGIN_NAME, "Only buffer is supported.");
		}

		var contents = file.contents.toString();
		var lines = contents.split("\n");
		var linesCount = lines.length;
		var fileParse = new EventEmitter();

		fileParse.on("ready", function(newLines) {
			var newContents = newLines.join("\n");
			if (contents != newContents) {
				file = new File({
					cwd: file.cwd,
					base: file.base,
					path: file.path,
					contents: new Buffer(newContents)
				});
			}
			buffer.push(file);
			callback();
		});

		// lines.forEach(parseLineFactory(file.path, parseLineEnd));
		lines.forEach(function(line, index, array) {
			var args = Array.prototype.slice.call(arguments);
			parseLineFactory(file.path, parseFileEnd).apply(this, args);
		});

		function parseFileEnd(error, data, index, array) {
			if (error) {
				fileParse.emit("error", error);
				return;
			}
			array[index] = data;
			var args = Array.prototype.slice.call(arguments, 1);
			if (--linesCount == 0) {
				fileParse.emit("ready", array);
			}
		}
	}

	function endStream() {
		for (var i = 0, count = buffer.length; i < count; i++) {
			var file = buffer[i];
			var filePath = path.normalize(file.path);
			if (parsedFiles[filePath] === true) {
				continue;
			}
			this.push(file);
		}
		this.emit("end");
	}

	return through.obj(fileContents, endStream);
};