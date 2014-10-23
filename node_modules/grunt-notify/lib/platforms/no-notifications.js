/*
 * grunt-notify
 * https://github.com/dylang/grunt-notify
 *
 * Copyright (c) 2013 Dylan Greene
 * Licensed under the MIT license.
 */
'use strict';

var NOTIFY_TYPE = 'no-notifications';

function supported(options) {
  options.debug({
    fallback: 'No supported notification systems were found'
  });
  return true;
}

function notify(options, cb) {
  options.debug({
    title: options.title,
    message: options.message
  });
  cb();
}

module.exports = {
  name: NOTIFY_TYPE,
  supported: supported,
  notify: notify
};