/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'snarl';

var path = require('path');
var os = require('os');
var spawn = require('../util/spawn');
var findApp = require('../util/findApp');

var cmd = 'heysnarl.exe';

var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../images/grunt-logo.png');

function findInstall() {

  var INSTALL_DIR_1 = path.join('full phat', 'Snarl', 'tools');
  var INSTALL_DIR_2 = path.join('Snarl', 'tools');
  var PROGRAM_FILES = process.env.ProgramFiles || '';
  var PROGRAM_FILES_X86 = process.env['ProgramFiles(x86)'] || '';

  return findApp(cmd) ||
    findApp(path.join(PROGRAM_FILES, INSTALL_DIR_1, cmd)) ||
    findApp(path.join(PROGRAM_FILES_X86, INSTALL_DIR_1, cmd)) ||
    findApp(path.join(PROGRAM_FILES, INSTALL_DIR_2, cmd)) ||
    findApp(path.join(PROGRAM_FILES_X86, INSTALL_DIR_2, cmd))
}

var fullPathToApplication = findInstall();

function supported(options) {

  options.debug({
    IS_WINDOWS: IS_WINDOWS,
    PROGRAM_FILES: process.env.ProgramFiles,
    PROGRAM_FILES_X86: process.env['ProgramFiles(x86)'],
    fullPathToApplication: fullPathToApplication,
    snarl: fullPathToApplication || (IS_WINDOWS ? 'We couldn\'t find `heysnarl.exe` in your path or in "full phat/Snarl/tools" - maybe you have an older version?' : 'Snarl not available for this OS.')
  });

  return IS_WINDOWS && !!fullPathToApplication;
}

function escape(str) {
  return str.toString().replace(/&/g, '&&').substr(0, 60);
}

function notify(options, cb) {

  var args = [
    'notify?' +
    'title=' + escape(options.title) + '&' +
    'text=' + escape(options.message) + '&' +
    'icon=' + (options.image || DEFAULT_IMAGE)
    ];

  options.debug({
    cmd: fullPathToApplication,
    args: args.join(' ')
  });

  spawn(fullPathToApplication || 'echo', args, function(code){
    options.debug({return_code: code});
    if (code < 200 && code > 0) {
      cb(code);
    } else {
      cb();
    }
  });
}

module.exports = {
  name: NOTIFY_TYPE,
  notify: notify,
  supported: supported
};