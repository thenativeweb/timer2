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
});