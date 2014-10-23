var wru = require('wru');
var collection = [];
var functions = require('./..');
var formatString = functions.formatString;
var inspect = require('util').inspect;

collection.push({
	name: "formatString function",
	test: function() {
		wru.assert("formatString function exists", typeof formatString === "function");
		var data = {"user": {name: "X"}};
		var result = formatString("Hello {user.name}!", data);
		wru.assert("Simple hello format", result === "Hello X!");
	}
});


wru.test(collection);