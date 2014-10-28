module.exports = (grunt) ->

  # Global vars
  paths =
    css: 'src/stylesheets/**/*.*'
    images: 'assets/*.{png,jpg,gif,svg}'
    assets: 'assets/',
    allAssets: [
      'assets/*.*',
      'config/*',
      'layout/*',
      'locales/*',
      'snippets/*',
      'templates/*',
      'templates/customers/*'
    ],
    srcStyles: [
      'src/stylesheets/global/_version.scss'
      'src/stylesheets/global/_helpers.scss'
      'src/stylesheets/global/_variables.scss.liquid'
      'src/stylesheets/partials/*'
      'src/stylesheets/modules/*'
      'src/stylesheets/templates/*'
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
    concat:
      dist:
        src: paths.srcStyles
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
        tasks: ['concat']
      images:
        files: [paths.images]
        tasks: ['imagemin']
      shopify:
        files: paths.allAssets,
        tasks: ['shopify', 'notify:shopify']

    clean:
      plugins: [
        '*.zip',
        'theme/assets/**/*',
        '!theme/assets/*.*'
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
  grunt.registerTask 'build', ['concat', 'imagemin']
  grunt.registerTask 'deploy', ['concat', 'imagemin', 'shopify:upload']
  grunt.registerTask 'zip', ['concat', 'imagemin', 'clean', 'compress', 'notify:zip']
