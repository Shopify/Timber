/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var which = require('which').sync;
var path = require('path');
var fs = require('fs');

module.exports = function(filename) {

  if (fs.existsSync(filename)) {
    return filename;
  }

  var filenameWithPath;

  // `which` throws errors in sync mode
  try {
    filenameWithPath = which(filename);
    if (!filenameWithPath.match(filename)){
      return false;
    }
  } catch (e) {
    filenameWithPath = false;
  }

  return filenameWithPath;
};