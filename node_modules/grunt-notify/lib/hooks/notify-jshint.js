/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt, options) {

  var notify = require('../notify-lib');

  var filename;
  var reason;
  var lineNumber;
  var count = 0;
  var enabled;

  function enable() {
    if (!enabled) {
      grunt.util.hooker.hook(grunt.log, 'writeln', grabErrors);
      grunt.util.hooker.hook(grunt.verbose, 'write', grabFilename);
      enabled = true;
    }
  }

  function disable() {
    if (enabled) {
      grunt.util.hooker.unhook(grunt.log, 'writeln');
      grunt.util.hooker.unhook(grunt.verbose, 'write');
      enabled = false;
    }
  }

  function grabFilename(message) {

    var parseMessage = grunt.log.uncolor(message).match(/^Linting\s(.*)\.\.\.$/);
    if (parseMessage && parseMessage.length === 2) {
      filename = parseMessage[1];
    }
  }

  function grabErrors(message) {
    if (!options.enabled) {
      return;
    }

    if (!message) {
      return;
    }

    var parseMessage = grunt.log.uncolor(message).match(/^\[L([0-9]*).*[0-9]:\s(.*)$/);

    if (parseMessage && parseMessage.length === 3) {

      count++;
      //grunt.log.ok('graberrors ' + count + parseMessage);

      if (count > options.max_jshint_notifications) {
        disable();
        return;
      }

      lineNumber = parseMessage[1];
      reason = parseMessage[2];

      return;
    }

    if (lineNumber && reason) {
      notify({
          title: options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
          message: [
            filename,
            'Line ' + lineNumber + ': ' + reason,
            message.trim()
          ].join('\n')
        });

      lineNumber = false;
      reason = false;
    }
  }

  function checkForJSHint(message) {
    if (message.match(/jshint/)) {
      enable();
    } else {
      disable();
    }
  }

  // try to catch jshint errors
  grunt.util.hooker.hook(grunt.log, 'header', checkForJSHint);

  function setOptions(opts) {
    options = opts;
  }

  return {
    setOptions: setOptions
  };

};
