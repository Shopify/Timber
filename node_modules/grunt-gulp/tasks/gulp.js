/*
 * grunt-gulp
 * https://github.com/shama/grunt-gulp
 *
 * Copyright (c) 2014 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var path = require('path');

  grunt.registerMultiTask('gulp', 'Run gulp tasks through grunt', function() {
    var done = this.async();
    var grunttask = this;
    var options = this.options({ tasks: null });

    if (typeof this.data === 'function') {
      gulp.task('default', this.data);
      gulp.run('default', done);
    } else {
      gulp.task('default', function() {
        var count = grunttask.files.length;
        function isdone() {
          count--;
          if (count < 1) {
            done(grunt.fail.errorcount === 0);
          }
        }
        grunttask.files.forEach(function(file) {
          var dirname = path.dirname(file.dest);
          var filename = path.relative(dirname, file.dest);

          var s = gulp.src(file.src);
          if (typeof options.tasks === 'function') {
            s = options.tasks.call(s, s);
          }

          var dest = gulp.dest(dirname);
          dest.on('end', function() {
            grunt.log.ok('Created ' + file.dest);
            isdone();
          });
          dest.on('error', function(err) {
            grunt.log.error(err);
            isdone();
          });
          return s.pipe(concat(filename)).pipe(dest);
        });
      });
      gulp.run();
    }
  });

};
