<!---

This file was automatically generated.

Use `grunt readme` to regenerate.

--->
## grunt-notify [![NPM version](https://badge.fury.io/js/grunt-notify.png)](http://badge.fury.io/js/grunt-notify)  [![Build Status](https://travis-ci.org/dylang/grunt-notify.png)](https://travis-ci.org/dylang/grunt-notify) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Automatic desktop notifications for Grunt errors and warnings using Growl for OS X or Windows, Mountain Lion and Mavericks Notification Center, and Notify-Send.

[![grunt-notify](https://nodei.co/npm/grunt-notify.png?downloads=true "grunt-notify")](https://nodei.co/npm/grunt-notify)


### Screenshots

| OS | Tool | Screenshots |
|---|---|---|
| OS X | OS X Notification Center | ![OS X Notification Center](https://f.cloud.github.com/assets/51505/982681/4e63bf88-0814-11e3-8b57-e2f5f4c2e1c1.png "OS X Notification Center") |
| OS X | Growl for Mac | ![Growl for Mac](https://f.cloud.github.com/assets/51505/982676/43c372da-0814-11e3-89e5-0cb0f45f50e1.png "Growl for Mac") |
| Windows 8 | Windows 8 notifications | ![Windows 8 Notifications](https://cloud.githubusercontent.com/assets/51505/2809792/d7d3f212-cd83-11e3-8bcf-ee0125568770.png "Windows 8 Notifications") |
| Windows | Growl for Windows | ![Growl for Windows](https://f.cloud.github.com/assets/51505/982679/4a199542-0814-11e3-93d9-5c46e2aed2d3.png "Growl for Windows") |
| Windows | Snarl | ![Snarl](https://f.cloud.github.com/assets/51505/982685/5419c058-0814-11e3-8976-54a811f21c92.png "Snarl") |
| Linux | Notify-Send | ![Notify-Send](https://f.cloud.github.com/assets/51505/1030946/056631f4-0ecb-11e3-97cb-46e12c484f8b.png "Notify-Send") |



### Getting Started

This plugin recommends Grunt `0.4.1` or newer.

### Installing

```bash
npm install grunt-notify --save-dev
```

Once that's done, add this line to your project's `Gruntfile.js`:

```js
grunt.loadNpmTasks('grunt-notify');
```



**That's all you need for automatic notifications.**

### Notify_Hooks Options

If you want change the automatic messaging configure a task called `notify_hooks`.

```js
grunt.initConfig({
  // This is optional!
  notify_hooks: {
    options: {
      enabled: true,
      max_jshint_notifications: 5, // maximum number of notifications from jshint output
      title: "Project Name" // defaults to the name in package.json, or will use project directory's name
    }
  }
});

// Load the task
grunt.loadNpmTasks('grunt-notify');

// This is required if you use any options.
grunt.task.run('notify_hooks');
```


### Showing Specific Notifications

Sometimes you want to show messages like "Uglify complete" or "Project Deployed" - that's easy to do too.

| ![Custom Message - Grunt](https://f.cloud.github.com/assets/51505/982678/48b6fa82-0814-11e3-890e-82518408084a.png "Custom Message - Grunt") |
|:-------------:|
| Custom Message - Grunt |

| ![Custom Message - Notification Center](https://f.cloud.github.com/assets/51505/982680/4b9df1ba-0814-11e3-88a4-0736f22dedf6.png "Custom Message - Notification Center") |
|:-------------:|
| Custom Message - Notification Center |

| ![Custom Message - Notify-Send](https://f.cloud.github.com/assets/51505/1030945/038e46dc-0ecb-11e3-9915-80c1838624a8.png "Custom Message - Notify-Send") |
|:-------------:|
| Custom Message - Notify-Send |

```js
grunt.initConfig({
  notify: {
    task_name: {
      options: {
        // Task-specific options go here.
      }
    },
    watch: {
      options: {
        title: 'Task Complete',  // optional
        message: 'SASS and Uglify finished running', //required
      }
    },
    server: {
      options: {
        message: 'Server is ready!'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-notify');

// simplified example
grunt.registerTask('server', [
  'uglify',
  'sass',
  'server',
  'notify:server'
  ]);
```

#### Options
* `title` _optional_ Notification title
* `message` _required_ Notification message



### Tests

Run `grunt` to lint and run the tests.


### Notification Systems

#### Mac

#####  OS X Notification System

*Support Included.*

If you are using OS X 10.8 Mountain Lion or newer a notification system is built in, but Apple does not provide a
notification API that Node can access. Only code written in Objective C and signed in XCode can access it.
This is not very friendly for Node users so we are using the tiny signed MIT-licensed native application
[Terminal Notifier](https://github.com/alloy/terminal-notifier) from [Eloy Durán](https://github.com/alloy).
I've changed the default icon which is owned by Apple to the Grunt logo.

##### Growl for OS X

*Requires growlnotify for OS X.*

Install **growlnotify** from the [Growl Downloads Page](http://growl.info/downloads). This will install in `/usr/local/bin/growlnotify`.

#### Windows

##### Snarl

*Included with Snarl.*

If you have downloaded and installed Snarl from [Snarl's web site](http://snarl.fullphat.net/) you'll have the commandline tool heysnarl as well.

##### Growl for Windows

*Requires growlnotify for Windows.*

Install **growlnotify** from the [growlnotify Page](http://www.growlforwindows.com/gfw/help/growlnotify.aspx).

##### Windows 8.1 Notifications

*Nothing to install.*

Create a pull request!

#### Linux

##### Notify-Send

*Nothing to install.*

I created an Ubuntu virutal machine and it had `notify-send` in the path.

I don't use Linux frequently so I don't know if this utility is available for other distros.

[notify-send man page](http://manpages.ubuntu.com/manpages/gutsy/man1/notify-send.1.html).

#### Chrome

*Not supported yet.*

Chrome has a notification system but I'm not sure if it's possible to use from a command-line Node app. Somebody could
probably create a Chrome Plugin helper for this.

#### Notifications aren't showing

Run `grunt -v` (for `verbose` mode) to show `grunt-notify` debug messages. It will tell you what notification system
 it thinks it can use. Create an issue and I'll look into it asap.



### About the Author

Hello fellow developer! My name is [Dylan Greene](https://github.com/dylang). When
not overwhelmed with my two kids I enjoy contributing to the open source community.
I'm a tech lead at [Opower](http://opower.com). I lead a team using Grunt and Angular to build software that
successfully helps people like us use less power.
Not too long ago I co-created [Doodle or Die](http://doodleordie.com), a hilarious web game with millions of
doodles that won us Node Knockout for the "most fun" category.
I'm [dylang](https://twitter.com/dylang) on Twitter and other places.

Some of my other Node projects:

| Name | Description | Github Stars | Npm Installs |
|---|---|--:|--:|
| [`grunt-prompt`](https://github.com/dylang/grunt-prompt) | Interactive prompt for your Grunt config using console checkboxes, text input with filtering, password fields. | 188 | 2,828 |
| [`rss`](https://github.com/dylang/node-rss) | RSS feed generator. A really simple API to add RSS feeds to any project. | 199 | 16,822 |
| [`shortid`](https://github.com/dylang/shortid) | Amazingly short non-sequential url-friendly unique id generator. | 163 | 4,039 |
| [`xml`](https://github.com/dylang/node-xml) | Fast and simple xml generator. Supports attributes, CDATA, etc. Includes tests and examples. | 41 | 21,485 |
| [`grunt-attention`](https://github.com/dylang/grunt-attention) | Display attention-grabbing messages in the terminal | _New!_ | 816 |
| [`flowdock-refined`](https://github.com/dylang/flowdock-refined) | Flowdock desktop app custom UI | _New!_ | 31 |
| [`anthology`](https://github.com/dylang/anthology) | Module information and stats for any @npmjs user | _New!_ | _TBD_ |
| [`observatory`](https://github.com/dylang/observatory) | Beautiful UI for showing tasks running on the command line. | _New!_ | 17 |
| [`changelog`](https://github.com/dylang/changelog) | Command line tool (and Node module) that generates a changelog in color output, markdown, or json for modules in npmjs.org's registry as well as any public github.com repo. | 53 | 80 |
| [`grunt-cat`](https://github.com/dylang/grunt-cat) | Echo a file to the terminal. Works with text, figlets, ascii art, and full-color ansi. | _New!_ | 59 |
| [`logging`](https://github.com/dylang/logging) | Super sexy color console logging with cluster support. | 21 | 171 |

_This list was generated using [anthology](https://github.com/dylang/anthology)._


### License
Copyright (c) 2014 Dylan Greene, contributors.

Released under the [MIT license](https://tldrlegal.com/license/mit-license).

Screenshots are [CC BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) (Attribution-ShareAlike).

***
_Generated using [grunt-readme](https://github.com/assemble/grunt-readme) with [grunt-templates-dylang](https://github.com/dylang/grunt-templates-dylang) on Saturday, April 26, 2014._ [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dylang/grunt-notify/trend.png)](https://bitdeli.com/free "Bitdeli Badge") [![Google Analytics](https://ga-beacon.appspot.com/UA-4820261-3/dylang/grunt-notify)](https://github.com/igrigorik/ga-beacon)


<!---

This file was automatically generated.

Use `grunt readme` to regenerate.

--->