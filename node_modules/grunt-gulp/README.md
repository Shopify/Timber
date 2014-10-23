# grunt-gulp [![Build Status](https://travis-ci.org/shama/grunt-gulp.png?branch=master)](https://travis-ci.org/shama/grunt-gulp)

> Run [gulp](http://gulpjs.com/) tasks through declarative [Grunt](http://gruntjs.com/) config

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gulp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gulp');
```

## Examples
A simple example that concats a list of javascript files in the `lib/` folder to `dist/bundle.js` with gulp:

``` js
grunt.initConfig({
  gulp: {
    'dist/bundle.js': ['lib/*.js'],
  },
});
```

But you're probably using this task because you want to use gulp tasks. So lets extend the example to compile coffeescript using [gulp-coffee](https://npmjs.org/package/gulp-coffee):

``` js
grunt.initConfig({
  gulp: {
    options: {
      tasks: function(stream) {
        return stream.pipe(require('gulp-coffee')());
      },
    },
    'dist/bundle.js': ['lib/*.coffee'],
  },
});
```

This task supports all of the ways [Grunt can be configured](http://gruntjs.com/configuring-tasks). Such as with `expand: true`; this example will compile each coffeescript file within the `lib/` folder into the `dist/` folder:

``` js
grunt.initConfig({
  gulp: {
    target: {
      options: {
        tasks: function(stream) { return stream.pipe(require('gulp-coffee')()); },
      },
      expand: true,
      cwd: 'lib/',
      src: '*.coffee',
      dest: 'dist/',
    },
  },
});
```

Or maybe you prefer a more gulp-like imperative config but still want to integrate with your Grunt build. You can bypass the Grunt config all together but still integrate:

``` js
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

grunt.initConfig({
  gulp: {
    myown: function() {
      var dest = gulp.dest('dist/');
      dest.on('end', function() {
        grunt.log.ok('All done!');
      });
      return gulp.src('lib/*.coffee')
        .pipe(coffee())
        .pipe(concat('bundle.js'))
        .pipe(dest);
    },
  },
});
```

### Options

#### options.tasks
Type: `Function`  
Default value: `null`

A function to pipe gulp tasks into your stream. Such as with `gulp-coffee` and `gulp-uglify`:

``` js
grunt.initConfig({
  gulp: {
    target: {
      options: {
        tasks: function(stream) {
          var coffee = require('gulp-coffee')({ bare: true }).on('error', grunt.log.error);
          var minify = require('gulp-uglify')();
          return stream.pipe(coffee).pipe(minify);
        },
      },
      src: ['lib/*.coffee'],
      dest: 'dist/bundle.min.js',
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 - initial release
