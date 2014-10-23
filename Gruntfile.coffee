module.exports = (grunt) ->

  paths =
    css: 'stylesheets/**/*.*'

  gulp = require 'gulp'
  cssimport = require 'gulp-cssimport'

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    exec:
      theme_watch:
        command: 'bundle exec theme watch'

    gulp:
      concat: ->
        return gulp.src(paths.css)
          .pipe(cssimport())
          .pipe(gulp.dest('assets/'))

    watch:
      gulp:
        files: paths.css
        tasks: ['gulp']

    concurrent:
      options:
        logConcurrentOutput: true
      watch:
        tasks: ['watch', 'exec']


  # Load NPM task plugins
  # ---------------------------
  require('load-grunt-tasks')(grunt)

  # Register tasks
  # ---------------------------
  grunt.registerTask 'default', ['concurrent:watch']
