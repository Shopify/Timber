module.exports = (grunt) ->

  # Global vars
  gulp = require 'gulp'
  cssimport = require 'gulp-cssimport'
  paths =
    css: 'stylesheets/**/*.*'
    images: 'theme/assets/*.{png,jpg,gif,svg}'
    assets: 'assets/'

  grunt.initConfig

    config: grunt.file.readJSON 'grunt-config.json'
    pkg: grunt.file.readJSON 'package.json'

    shopify:
      options:
        api_key: '<%= config.private_api %>'
        password: '<%= config.private_password %>'
        url: '<%= config.shop_url %>'
        theme: '<%= config.theme_id %>'

    # Helper methods
    notify:
      shopify:
        options:
          title: 'Shopify'
          message: 'Files finished uploading'
      zip:
        options:
          message: 'Zip file created'

    # File manipulation
    gulp:
      concat: ->
        return gulp.src(paths.css)
          .pipe(cssimport())
          .pipe(gulp.dest(paths.assets))

    imagemin:
      dynamic:
        options:
          optimizationLevel: 3
        files: [{
          expand: true
          src: ['*.{png,jpg,gif,svg}']
          dest: paths.assets
        }]

    # Action methods
    watch:
      styles:
        files: paths.css
        tasks: ['gulp']
      images:
        files: ['assets/*.{png,jpg,gif,svg}']
        tasks: ['imagemin']
      shopify:
        files: [
          'assets/*',
          'config/*',
          'layout/*',
          'locales/*',
          'snippets/*',
          'templates/*',
          'templates/customers/*'
        ],
        tasks: ['shopify', 'notify:shopify']

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
  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'zip', ['gulp', 'imagemin', 'clean', 'compress', 'notify:zip']
