/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2014 Dylan Greene, 2014 Matej Simek
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'toaster';

var path = require('path');
var os = require('os');
var spawn = require('../util/spawn');
var semver = require('semver');

// A wee Win8 console notifications app. Post toast notifications from the console, making it easy to integrate into existing batch scripts etc.
// Toaster by Nels Oscar https://github.com/nels-o/toaster
var CMD = path.resolve(__dirname + '../../../bin/toaster/toast.exe');
var IS_WINDOWS = os.type() === 'Windows_NT';
var DEFAULT_IMAGE = path.resolve(__dirname + '../../../images/grunt-logo.png');


function supported(options) {
  var WINDOWS_8;
  try {
    WINDOWS_8 = IS_WINDOWS && semver.satisfies(os.release(), '>=6.2.9200');
  } catch (e) {
    options.debug({semverError: e });
  }

  options.debug({
    os: os.type(),
    version: os.release(),
    IS_WINDOWS: IS_WINDOWS,
    WINDOWS_8: WINDOWS_8,
    toaster: IS_WINDOWS && WINDOWS_8 ? 'Will use Windows 8 notifications' : 'Not available for your OS.'
  });

  return IS_WINDOWS && WINDOWS_8;
}

function notify(options, cb) {
  var args = [
    '-p', DEFAULT_IMAGE,
    '-t', options.title,
    '-m', options.message
  ];

  options.debug({
    cmd: CMD,
    args: args.join(' ')
  });

  spawn(CMD, args, function(code) {
    if (code !== 0) {
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