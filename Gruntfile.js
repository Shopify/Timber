module.exports = function(grunt) {

  var paths = {
    css: 'stylesheets/**/*.*'
  };

  var gulp = require('gulp');
  var cssimport = require("gulp-cssimport");

  grunt.initConfig({
    exec: {
      theme_watch: {
        command: 'bundle exec theme watch'
      }
    },

    gulp: {
      concat: function() {
        return gulp.src(paths.css)
          .pipe(cssimport())
          .pipe(gulp.dest('assets/'));
      }
    },

    watch: {
      gulp: {
        files: paths.css,
        tasks: ['gulp']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: {
        tasks: ['watch', 'exec']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask ('default', ['concurrent:watch']);

};
