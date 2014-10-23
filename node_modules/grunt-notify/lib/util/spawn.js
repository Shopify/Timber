'use strict';

var grunt = require('grunt');
var spawn = require('child_process').spawn;

module.exports = function(cmd, args, cb){

  var options = {
    detached: true,
    stdio: [ 'ignore', 'ignore', 'ignore' ]
  };

  var child = spawn(cmd, args, options);

  child.on('exit', function (code) {
    if (typeof cb === 'function') {
      cb(code);
    }
  });
};