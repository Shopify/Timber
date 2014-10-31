module.exports = (grunt) ->

  # Global vars
  paths =
    css: 'src/stylesheets/**/*.*'
    concatFiles: [
      'src/stylesheets/*.*'
    ]
    images: 'assets/*.{png,jpg,gif,svg}'
    assets: 'assets/'
    allAssets: [
      'assets/*.*',
      'config/*',
      'layout/*',
      'locales/*',
      'snippets/*',
      'templates/**/*'
    ]

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
    shopify_sass:
      theme:
        src: 'src/stylesheets/timber.scss'
        dest: 'assets/timber.scss.liquid'

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
        tasks: ['shopify_sass']
      images:
        files: [paths.images]
        tasks: ['imagemin']
      shopify:
        files: paths.allAssets,
        tasks: ['shopify', 'notify:shopify']

    clean:
      plugins: [
        '*.zip',
        'assets/**/*',
        '!assets/*.*'
      ]

    compress:
      main:
        options:
          mode: 'zip'
          archive: 'timber-v<%= pkg.version %>.zip'
        files: [
          src: paths.allAssets
        ]

  # Load NPM task plugins
  require('load-grunt-tasks')(grunt)

  # Register tasks
  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'build', ['shopify_sass', 'imagemin', 'clean']
  grunt.registerTask 'deploy', ['shopify_sass', 'imagemin', 'shopify:upload']
  grunt.registerTask 'zip', ['shopify_sass', 'imagemin', 'clean', 'compress', 'notify:zip']
