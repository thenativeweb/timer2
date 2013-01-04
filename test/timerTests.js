'use strict';

var assert = require('node-assertthat');

var timer = require('../lib/timer');

suite('timer', function () {
  suite('create', function () {
    test('returns a timer that emits periodically.', function (done) {
      var counter = 0;
      timer.create(100).on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        assert.that(counter, is.equalTo(5));
        done();
      }, 550);
    });

    test('returns a timer that emits immediately if specified.', function (done) {
      var counter = 0;
      timer.create(100, { immediate: true }).on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        assert.that(counter, is.equalTo(6));
        done();
      }, 550);
    });
  });

  suite('start', function () {
    test('starts a stopped timer.', function (done) {
      var counter = 0;
      var t = timer.create(100);
      t.on('elapsed', function () {
        counter++;
      });
      t.stop();
      t.start();
      setTimeout(function () {
        assert.that(counter, is.equalTo(5));
        done();
      }, 550);
    });

    test('ignores multiple calls.', function (done) {
      var counter = 0;
      var t = timer.create(100);
      t.on('elapsed', function () {
        counter++;
      });
      t.stop();
      t.start();
      t.start();
      setTimeout(function () {
        assert.that(counter, is.equalTo(5));
        done();
      }, 550);
    });
  });

  suite('stop', function () {
    test('stops a running timer.', function (done) {
      var counter = 0;
      var t = timer.create(100);
      t.on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        t.stop();
        setTimeout(function () {
          assert.that(counter, is.equalTo(1));
          done();
        }, 500);
      }, 150);
    });

    test('ignores multiple calls.', function (done) {
      var counter = 0;
      var t = timer.create(100);
      t.on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        t.stop();
        t.stop();
        setTimeout(function () {
          assert.that(counter, is.equalTo(1));
          done();
        }, 500);
      }, 150);
    });
  });
});