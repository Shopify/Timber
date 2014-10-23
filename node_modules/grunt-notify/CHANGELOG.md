* 7 Aug 2014 - 0.3.1
 * Updated dependencies
* 26 April 2014 - 0.3.0
 * Windows 8 Notifications thanks to [@enzy](https://github.com/enzy).
* 10 March 2014 - 0.2.20
 * Grunt icon in OS X native notifications.
 * Fix bug when it would catch errors with no messages.
 * Fix dates in changelog.
* 2 March 2014 - 0.2.19
 * Add duration to notify-send
* 2 March 2014 - 0.2.18
 * Avoid multiple notifications with notify-send
* 5 January 2014 - 0.2.17
 * New documentation system powered by grunt-readme.
 * New section in docs about the notification systems.
 * More doc improvements coming in the future.
* 7 November 2013 - 0.2.16
 * Avoid duplicate messages.
* 3 November 2013 - 0.2.15
 * Fixed issue with OS X 10.9 Mavericks. Unfortunately Apple took away the ability to customize the icon.
* 29 October 2013 - 0.2.14
 * Since grunt-contrib-watch can overwrite grunt's warn and fatal functions, we now watch writeln as well for warnings and fatals.
* 26 August 2013 - 0.2.13
 * Added Grunt icon to `notify-send`.
* 24 August 2013 - 0.2.12
 * Fix bug causing exception with Semver in Linux, thanks to [@theefer](https://github.com/theefer).
 * Won't notify `Aborted due to warnings.` when there was already a more helpful notification.
 * More automated tests.
 * Travis support added.
 * Moved changelog to it's own file.
* 18 August 2013 - 0.2.11
 * Added another directory Snarl could be installed to.
* 18 August 2013 - 0.2.10
 * Added more information to the `--debug` output.
* 18 August 2013 - 0.2.9
 * Add debug output. Use `--debug` to see it.
* 17 August 2013 - 0.2.8
 * Fixed bug caused Grunt-Notify to not work in 32-bit windows.
 * Fixed bug that prevented Snarl from working if the task ended quickly from an error.
 * Removed defaults for how many notifications and how long notifications say on the screen for Snarl.
 * Replaced Nodeunit tests with Mocha tests.
* 29 July 2013 - 0.2.7
 * Fixed bug that could prevent Growl from working.
* 26 July 2013 - 0.2.5
 * [Windows Snarl](http://snarl.fullphat.net/) support thanks to [@vohof](https://github.com/vohof) and [@FunkMonkey](https://github.com/FunkMonkey).
* 30 May 2013 - 0.2.4
 * Make notications more reliable. They should show up now even if Grunt exists from an error.
 * Fix problems with `\n` in a windows path becoming a new line, like `c:\new`.
 * Don't show too many jshint errors. By default only 5 jshint notifications, and that number is configurable.
* 4 Apr 2013 - 0.2.3
 * Avoid problems when there's no stack trace on errors thanks to [@joeybaker](https://github.com/joeybaker).
* 1 Apr 2013 - 0.2.2
 * Fix bug in Notify-Send thanks to [@jcoffin](https://github.com/jcoffin).
* 1 Apr 2013 - 0.2.1
 * Fix dependencies.
* 31 Mar 2013 - 0.2.0
 * Complete rewrite.
 * New support for Grunt in Windows.
 * Now parses JSLint errors to show them in notification.
 * Notification title will automatically use package.json name field or directory name.
 * No more subtitle option.
 * Title now includes the task that was running.
 * Better command line escaping including support for newline `\n`.
* 17 Mar 2013 - 0.1.6
 * Code refactor to clean things up
* 19 Feb 2013 - 0.1.4
 * Added Linux support thanks to [@johnmccalla](https://github.com/johnmccalla).
 * Listen for fatal errors.
 * Simplified options.
 * Default title is project title.
 * Show file name and line number if available.
* 28 Dec 2012 - 0.1.0-0.1.3
 * First version