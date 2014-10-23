/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt, options) {

  var message_count = 0;
  var StackParser = require('stack-parser');
  var notify = require('../notify-lib');
  var removeColor = require('../util/removeColor');

  var cwd = process.cwd();

  function watchForContribWatchWarnings(e) {

    if (!e || typeof e !== 'string') {
        return;
    }

    var msg = removeColor(e);
    msg = msg.replace(' Use --force to continue.', '');

    if (msg.indexOf('Warning:') === 0) {
        return notifyHook(msg.replace('Warning: ', ''));
    }
    if (msg.indexOf('Fatal error:') === 0) {
        return notifyHook(msg.replace('Fatal error: ', ''));
    }

    return e;
  }

  function exception(e) {
    var stackDump, stack, message;

    if (e.stack && typeof e.stack !== 'string'){
      stackDump = StackParser.parse(e.stack);
      stack = stackDump[0];

      // Find the first stack that isn't a node module or an internal Node function
      while (stack && (stack.file.match('/node_modules') || !stack.file.match('/'))) {
        stack = stackDump.shift();
      }
    }

    if (stack && stack.file) {
      message = [
        stack.file.replace(cwd, ''),
        'Line ' + stack.line,
        e.message
      ].join('\n');
    } else {
      message = e.message;
    }

    return message;
  }

  /**
   * Hook for showing the automatic message
   * @param e Exception or message
   * @returns {*}
   */
  function notifyHook(e) {

    message_count++;

    var message;

    if (!options.enabled) {
      return;
    }

    if (!e) {
      return;
    }

    if (e && e.length === 1) {
      e = e[0];
    }

    if (/Task .* failed\./.test(e.message)) {
      message = e.message;
    } else if (e.message && e.stack) {
      message = exception(e);
    } else {
      message = e + '';
    }

    if (message_count > 0 && message === 'Aborted due to warnings.') {
      // skip unhelpful message because there was probably another one that was more helpful
      return;
    }

    // shorten message by removing full path
    // TODO - make a global replace
    message = message.replace(cwd, '').replace('\x07', '');

    return notify({
      title:    options.title + (grunt.task.current.nameArgs ? ' ' + grunt.task.current.nameArgs : ''),
      message:  message
    });
  }

  // run on warning
  grunt.util.hooker.hook(grunt, 'warn', notifyHook);
  grunt.util.hooker.hook(grunt.fail, 'warn', notifyHook);
  // run on error
  grunt.util.hooker.hook(grunt.fail, 'error', notifyHook);
  grunt.util.hooker.hook(grunt.log, 'fail', notifyHook);
  grunt.util.hooker.hook(grunt.log, 'error', notifyHook);
  // run on fatal
  grunt.util.hooker.hook(grunt.fail, 'fatal', notifyHook);

  // grunt-contrib-watch replaces some of these functions so
  // we need to watch all writeln's too
  // https://github.com/gruntjs/grunt-contrib-watch/issues/232
  grunt.util.hooker.hook(grunt.log, 'writeln', watchForContribWatchWarnings);

  function setOptions(opts) {
    options = opts;
  }

  return {
    setOptions: setOptions
  };
};
