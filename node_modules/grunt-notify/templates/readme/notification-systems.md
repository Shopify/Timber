## Notification Systems

### Mac

####  OS X Notification System

*Support Included.*

If you are using OS X 10.8 Mountain Lion or newer a notification system is built in, but Apple does not provide a
notification API that Node can access. Only code written in Objective C and signed in XCode can access it.
This is not very friendly for Node users so we are using the tiny signed MIT-licensed native application
[Terminal Notifier](https://github.com/alloy/terminal-notifier) from [Eloy Durán](https://github.com/alloy).
I've changed the default icon which is owned by Apple to the Grunt logo.

#### Growl for OS X

*Requires growlnotify for OS X.*

Install **growlnotify** from the [Growl Downloads Page](http://growl.info/downloads). This will install in `/usr/local/bin/growlnotify`.

### Windows

#### Snarl

*Included with Snarl.*

If you have downloaded and installed Snarl from [Snarl's web site](http://snarl.fullphat.net/) you'll have the commandline tool heysnarl as well.

#### Growl for Windows

*Requires growlnotify for Windows.*

Install **growlnotify** from the [growlnotify Page](http://www.growlforwindows.com/gfw/help/growlnotify.aspx).

#### Windows 8.1 Notifications

*Nothing to install.*

Create a pull request!

### Linux

#### Notify-Send

*Nothing to install.*

I created an Ubuntu virtual machine and it had `notify-send` in the path.

I don't use Linux frequently so I don't know if this utility is available for other distros.

[notify-send man page](http://manpages.ubuntu.com/manpages/gutsy/man1/notify-send.1.html).

`notify-send` has an addition `duration` option which takes a number seconds. The default is 3 seconds.

### Chrome

*Not supported yet.*

Chrome has a notification system but I'm not sure if it's possible to use from a command-line Node app. Somebody could
probably create a Chrome Plugin helper for this.

### Notifications aren't showing

Run `grunt -v` (for `verbose` mode) to show `grunt-notify` debug messages. It will tell you what notification system
 it thinks it can use. Create an issue and I'll look into it asap.