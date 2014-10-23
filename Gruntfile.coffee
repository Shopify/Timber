module.exports = (grunt) ->

  paths =
    css: 'stylesheets/**/*.*'
    images: 'assets/*.{png,jpg,gif,svg}'
    dest: 'assets/'

  gulp = require 'gulp'
  cssimport = require 'gulp-cssimport'

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    # Helper methods
    notify:
      build:
        options:
          message: 'Build complete'

    # Shopify theme_gem methods
    exec:
      theme_watch:
        command: 'bundle exec theme watch'

    # File manipulation
    gulp:
      concat: ->
        return gulp.src(paths.css)
          .pipe(cssimport())
          .pipe(gulp.dest('assets/'))

    imagemin:
      dynamic:
        options:
          optimizationLevel: 3
        files: [{
          expand: true
          cwd: paths.dest
          src: ['*.{png,jpg,gif,svg}']
          dest: paths.dest
        }]

    # Action methods
    watch:
      styles:
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
  grunt.registerTask 'build', ['gulp', 'imagemin', 'notify:build']
