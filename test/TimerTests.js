'use strict';

var assert = require('assertthat');

var Timer = require('../lib/Timer');

suite('Timer', function () {
  test('is a function.', function (done) {
    assert.that(Timer).is.ofType('function');
    done();
  });

  test('throws an error if timeout is missing.', function (done) {
    assert.that(function () {
      /*eslint-disable no-new*/
      new Timer();
      /*eslint-enable no-new*/
    }).is.throwing('undefined is not: number');
    done();
  });

  test('returns an event emitter.', function (done) {
    var timer = new Timer(100);
    assert.that(timer).is.ofType('object');
    assert.that(timer.on).is.ofType('function');
    assert.that(timer.once).is.ofType('function');
    assert.that(timer.removeListener).is.ofType('function');
    timer.destroy();
    done();
  });

  test('emits a \'tick\' event periodically.', function (done) {
    var timer = new Timer(100);

    var counter = 0;
    timer.on('tick', function () {
      counter++;
    });

    setTimeout(function () {
      assert.that(counter).is.equalTo(5);
      timer.destroy();
      done();
    }, 550);
  });

  test('emits a \'tick\' event periodically with variations.', function (done) {
    var timer = new Timer(100, {
      variation: 50
    });

    var counter = 0;
    timer.on('tick', function () {
      counter++;
    });

    setTimeout(function () {
      assert.that(counter).is.between(3, 10);
      timer.destroy();
      done();
    }, 550);
  });

  test('emits a \'tick\' event immediately if requested.', function (done) {
    var timer = new Timer(100, {
      immediate: true
    });

    var counter = 0;
    timer.on('tick', function () {
      counter++;
    });

    setTimeout(function () {
      assert.that(counter).is.equalTo(1);
      timer.destroy();
      done();
    }, 50);
  });

  suite('stop', function () {
    test('is a function.', function (done) {
      var timer = new Timer(100);
      assert.that(timer.stop).is.ofType('function');
      timer.destroy();
      done();
    });

    test('stops a running timer.', function (done) {
      var timer = new Timer(100);

      var counter = 0;
      timer.on('tick', function () {
        counter++;
      });

      timer.stop();

      setTimeout(function () {
        assert.that(counter).is.equalTo(0);
        timer.destroy();
        done();
      }, 150);
    });

    test('ignores multiple calls.', function (done) {
      var timer = new Timer(100);

      timer.stop();
      timer.stop();

      timer.destroy();
      done();
    });
  });

  suite('start', function () {
    test('is a function.', function (done) {
      var timer = new Timer(100);
      assert.that(timer.start).is.ofType('function');
      timer.destroy();
      done();
    });

    test('starts a stopped timer.', function (done) {
      var timer = new Timer(100);

      var counter = 0;
      timer.on('tick', function () {
        counter++;
      });

      timer.stop();
      timer.start();

      setTimeout(function () {
        assert.that(counter).is.equalTo(1);
        timer.destroy();
        done();
      }, 150);
    });

    test('ignores multiple calls.', function (done) {
      var timer = new Timer(100);

      var counter = 0;
      timer.on('tick', function () {
        counter++;
      });

      timer.stop();
      timer.start();
      timer.start();

      setTimeout(function () {
        assert.that(counter).is.equalTo(1);
        timer.destroy();
        done();
      }, 150);
    });
  });

  suite('destroy', function () {
    test('is a function.', function (done) {
      var timer = new Timer(100);
      assert.that(timer.destroy).is.ofType('function');
      timer.destroy();
      done();
    });

    test('stops a running timer.', function (done) {
      var timer = new Timer(100);

      var counter = 0;
      timer.on('tick', function () {
        counter++;
      });

      timer.destroy();

      timer.on('tick', function () {
        counter++;
      });

      setTimeout(function () {
        assert.that(counter).is.equalTo(0);
        timer.destroy();
        done();
      }, 150);
    });

    test('removes all event listeners.', function (done) {
      var timer = new Timer(100);

      var counter = 0;
      timer.on('tick', function () {
        counter++;
      });

      timer.destroy();
      timer.start();

      setTimeout(function () {
        assert.that(counter).is.equalTo(0);
        timer.destroy();
        done();
      }, 150);
    });
  });
});
