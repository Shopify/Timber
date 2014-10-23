/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */

'use strict';
var removeColor = require('./util/removeColor');
var debug = require('./util/debug');

// Don't show the same message twice in a row
var previousMessage;
var previousMessageTimeoutMS = 1000;
var previousMessageTimer;


var notifyPlatform;

function choosePlatform() {

  var options = { debug: debug('grunt-notify')};

  // This needs to be cleaned up to make it easier to add new platforms

  var growl_notify = require('./platforms/growl-notify');

  if (growl_notify.supported(options)) {
    return growl_notify;
  }

  var hey_snarl = require('./platforms/hey-snarl');

  if (hey_snarl.supported(options)) {
    return hey_snarl;
  }

  var notification_center = require('./platforms/notification-center');

  if (notification_center.supported(options)) {
    return notification_center;
  }

  var notify_send = require('./platforms/notify-send');

  if (notify_send.supported(options)) {
    return notify_send;
  }

  var toaster = require('./platforms/toaster');

  if (toaster.supported(options)) {
    return toaster;
  }

  return require('./platforms/no-notifications');
}


/**
 * Public function to notify
 * @param options - options.message is the only required value. title is recommended. subtitle is going overboard.
 * @param [cb] - optional callback. function(err, stdout, stderr)
 */
function postNotification(options, cb) {

  options.title = removeColor(options.title);
  options.message = removeColor(options.message);

  if (!options.message) {
    return cb && cb(!options.message && 'Message is required');
  }

  if (!notifyPlatform) {
    notifyPlatform = choosePlatform();
  }

  function resetPreviousTimer(newMessage) {
    previousMessage = newMessage;
    clearTimeout(previousMessageTimer);
    previousMessageTimer = setTimeout(function(){previousMessage = false;}, previousMessageTimeoutMS);
  }

  if (options.message === previousMessage) {
    resetPreviousTimer(options.message);
    if (typeof cb === 'function') {
            cb(err);
          }
    return;
  }

  resetPreviousTimer(options.message);

  options.debug = debug(notifyPlatform.name); //for debug logging

  return notifyPlatform.notify(options, function(err){
      if (err) {
        options.debug({
          return_code: err
        });
      }
      if (typeof cb === 'function') {
        cb(err);
      }
    });
}

module.exports = postNotification;
