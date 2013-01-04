'use strict';

var assert = require('node-assertthat');

var timer = require('../lib/timer');

suite('timer', function () {
  suite('create', function () {
    test('returns a timer that emits periodically.', function (done) {
      var t = timer.create(100),
          counter = 0;
      t.on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        assert.that(counter, is.equalTo(5));
        done();
      }, 550);
    });

    test('returns a timer that emits immediately if specified.', function (done) {
      var t = timer.create(100, { immediate: true }),
          counter = 0;
      t.on('elapsed', function () {
        counter++;
      });
      setTimeout(function () {
        assert.that(counter, is.equalTo(6));
        done();
      }, 550);
    });
  });
});