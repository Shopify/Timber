var concat = require('../');
var should = require('should');
var os = require('os');
var path = require('path');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
require('mocha');

describe('gulp-concat', function() {
  describe('concat()', function() {
    it('should concat two files', function(done) {
      var stream = concat("test.js");
      var fakeFile = new File({
        cwd: "/home/contra/",
        base: "/home/contra/test",
        path: "/home/contra/test/file.js",
        contents: new Buffer("wadup")
      });

      var fakeFile2 = new File({
        cwd: "/home/contra/",
        base: "/home/contra/test",
        path: "/home/contra/test/file2.js",
        contents: new Buffer("doe")
      });

      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        var newFilePath = path.resolve(newFile.path);
        var expectedFilePath = path.resolve("/home/contra/test/test.js");
        newFilePath.should.equal(expectedFilePath);

        newFile.relative.should.equal("test.js");
        String(newFile.contents).should.equal("wadup\ndoe");
        Buffer.isBuffer(newFile.contents).should.equal(true);
        done();
      });
      stream.write(fakeFile);
      stream.write(fakeFile2);
      stream.end();
    });

    it('should concat two files by custom EOL', function(done) {
      var stream = concat("test.js", {newLine: '\r\n'});
      var fakeFile = new File({
        cwd: "/home/contra/",
        base: "/home/contra/test",
        path: "/home/contra/test/file.js",
        contents: new Buffer("wadup")
      });

      var fakeFile2 = new File({
        cwd: "/home/contra/",
        base: "/home/contra/test",
        path: "/home/contra/test/file2.js",
        contents: new Buffer("doe")
      });

      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);

        var newFilePath = path.resolve(newFile.path);
        var expectedFilePath = path.resolve("/home/contra/test/test.js");
        newFilePath.should.equal(expectedFilePath);

        newFile.relative.should.equal("test.js");
        String(newFile.contents).should.equal("wadup\r\ndoe");
        Buffer.isBuffer(newFile.contents).should.equal(true);
        done();
      });
      stream.write(fakeFile);
      stream.write(fakeFile2);
      stream.end();
    });

  });
});
