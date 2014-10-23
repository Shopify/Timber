/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2012 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    // Configuration to be run (and then tested).
    notify: {
      custom_options: {
        options: {
          title: 'Notify Title',
          message: 'This is a "Notify Message" test!'
        }
      },
      just_message: {
        options: {
          message: 'Just Message'
        }
      },
      example: {
        options: {
          title: 'Doodle or Die',  // optional
          message: 'Deploy to production success!' //required
        }
      },
      directory: {
        options: {
          title: 'Directory',
          message: 'Look in c:\\temp\\new\\ or /var/tmp/new.'
        }
      },
      newlines: {
        options: {
          title: 'Directory',
          message: 'Line 1\nLine 2\nLine3\nLine 4\nLine 5.'
        }
      }
    },

    watch: {
      example: {
        options: {
          spawn: true
        },
        files: [
          'Gruntfile.js',
          'tasks/**/*.js',
          'test/**/*.js'
        ],
        tasks: [
          'notify:custom_options'
        ]
      },
      test: {
        options: {
          spawn: true
        },
        files: [
          'Gruntfile.js',
          'tasks/**/*.js',
          'test/**/*.js'
        ],
        tasks: [
          'jshint',
          'mochaTest'
        ]
      }
    },

    mochaTest: {
      notify: {
          src: 'test/**/*.test.js',
          options: {
              reporter: 'spec'
          }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'tests/**/*'
      ],
      fixtures: [
        'test/fixtures/*.js'
      ]
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'jshint',
    'notify',
    'mochaTest'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'test'
  ]);

};