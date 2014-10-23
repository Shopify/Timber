/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');

var projectName;

function packageJson() {
  var packageObj,
    projectName;
  try {
    packageObj = require(process.cwd() + path.sep + 'package.json');
    projectName = packageObj.name;
  } catch (e) {
    // package.json not found
  }

  return projectName;
}

function currentWorkingDirectory() {
  projectName = process.cwd().split(path.sep).pop();
  return projectName;
}


module.exports = function guessProjectName(){
  return projectName || packageJson() || currentWorkingDirectory();
};
