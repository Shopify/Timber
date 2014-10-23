module.exports = (grunt) ->

  # Global vars
  gulp = require 'gulp'
  cssimport = require 'gulp-cssimport'
  paths =
    css: 'stylesheets/**/*.*'
    images: 'assets/*.{png,jpg,gif,svg}'
    dest: 'assets/'

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    # Helper methods
    notify:
      build:
        options:
          message: 'Build complete'
      zip:
        options:
          message: 'Zip ready'

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

    clean: ['*.zip']

    compress:
      main:
        options:
          mode: 'zip'
          archive: '<%= pkg.name %>.zip'
        files: [
          src: [
            'assets/*'
            'config/*'
            'layout/*'
            'locales/*'
            'snippets/*'
            'templates/*'
            'templates/customers/*'
          ]
        ]


  # Load NPM task plugins
  require('load-grunt-tasks')(grunt)

  # Register tasks
  grunt.registerTask 'default', ['concurrent:watch']
  grunt.registerTask 'build', ['gulp', 'imagemin', 'notify:build']
  grunt.registerTask 'zip', ['gulp', 'imagemin', 'clean', 'compress', 'notify:zip']
