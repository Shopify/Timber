'use strict';
var expect = require('chai').expect;

//var grunt = require('grunt');
var notify = require('../lib/notify-lib');
var proxyquire = require('proxyquire');


describe('grunt-notify', function () {

  describe('sanity checks', function () {
    it('notify', function (done) {
      notify({ title: 'title', message: 'message' }, function(err){
        if (err) throw err;
        //expect(err).to.be.empty;
        done();
      });
    });

    it('weird chars', function (done) {
      notify({ title: 'weird chars', message: 'bang! "quotes" [brackets] &and&' }, function(err){
        if (err) throw err;
        //expect(err).to.be.;
        done();
      });
    });

    it('notify', function (done) {
      notify({ title: 'title' }, function(err){
        expect(err).to.equal('Message is required');
        done();
      });
    });

  });

  describe('try all the platforms', function () {

    var debug = function(msg){
      //console.log(msg);
      expect(msg).to.be.an.object;
    };

    function fakeSpawn(cmd, args, cb){
      expect(cmd).to.not.be.empty;
      expect(args).to.be.an.array;
      console.log(cmd, args.join(' '));
      cb();
    }

    var options = {
      debug: debug
    };

    it('growl', function (done) {
      var growl = require('../lib/platforms/growl-notify');
      expect(growl.name).to.equal('growl');
      expect(growl.supported(options)).to.be.a.boolean;
      expect(growl.notify).to.be.a.function;

      if (!growl.supported(options)) {
        growl = proxyquire('../lib/platforms/growl-notify', {'../util/spawn': fakeSpawn });
      }

      growl.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('notification center', function (done) {
      var noteCenter = require('../lib/platforms/notification-center');
      expect(noteCenter.name).to.equal('notification-center');
      expect(noteCenter.supported(options)).to.be.a.boolean;
      expect(noteCenter.notify).to.be.a.function;

      if (!noteCenter.supported(options)) {
        noteCenter = proxyquire('../lib/platforms/notification-center', {'../util/spawn': fakeSpawn });
      }

      noteCenter.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('snarl', function (done) {
      var snarl = require('../lib/platforms/hey-snarl');
      expect(snarl.name).to.equal('snarl');
      expect(snarl.supported(options)).to.be.a.boolean;
      expect(snarl.notify).to.be.a.function;

      if (!snarl.supported(options)) {
        snarl = proxyquire('../lib/platforms/hey-snarl', {'../util/spawn': fakeSpawn });
      }

      snarl.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('notify send', function (done) {
      var notifySend = require('../lib/platforms/notify-send');
      expect(notifySend.name).to.equal('notify-send');
      expect(notifySend.supported(options)).to.be.a.boolean;
      expect(notifySend.notify).to.be.a.function;

      if (!notifySend.supported(options)) {
        notifySend = proxyquire('../lib/platforms/notify-send', {'../util/spawn': fakeSpawn });
      }

      notifySend.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('toaster', function (done) {
      var toaster = require('../lib/platforms/toaster');
      expect(toaster.name).to.equal('toaster');
      expect(toaster.supported(options)).to.be.a.boolean;
      expect(toaster.notify).to.be.a.function;

      if (!toaster.supported(options)) {
        toaster = proxyquire('../lib/platforms/toaster', {'../util/spawn': fakeSpawn });
      }

      toaster.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

    it('no notifications', function (done) {
      var noNotes = require('../lib/platforms/no-notifications');
      expect(noNotes.name).to.equal('no-notifications');
      expect(noNotes.supported(options)).to.be.a.boolean;
      expect(noNotes.notify).to.be.a.function;

      noNotes.notify({ title: 'title', message: 'message', debug: debug }, done);
    });

  });

});
