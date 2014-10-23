/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function gruntTask(grunt) {

  var guessProjectName = require('../lib/util/guessProjectName');

  // All of these settings are customizable via notify_hooks
  var defaults = {
    enabled: true,
    max_jshint_notifications: 5,
    title: guessProjectName()
  };

  var notifyFail = require('../lib/hooks/notify-fail')(grunt, defaults);
  var notifyJSHint = require('../lib/hooks/notify-jshint')(grunt, defaults);

  grunt.registerTask('notify_hooks', 'Config the automatic notification hooks.', function(){
    var options = this.options(defaults);
    notifyFail.setOptions(options);
    notifyJSHint.setOptions(options);
  });
};