'use strict';

var _ = require('underscore'),
    evented = require('evented');

var timer = {
  create: function (timeout, options) {
    options = _.defaults(options || {}, { immediate: false });

    if (timeout < 0) {
      throw new Error('timeout must not be less than 0.');
    }

    if (timeout === 0) {
      return evented({
        start: function () {},
        stop: function () {}
      });
    }

    var instance,
        isRunning = false;

    var t = evented({
      start: function () {
        if (isRunning) {
          return;
        }
        var that = this;
        if (options.immediate) {
          process.nextTick(function () {
            that.emit('elapsed');
          });
        }
        instance = setInterval(function () {
          that.emit('elapsed');
        }, timeout);
        isRunning = true;
      },
      stop: function () {
        if (!isRunning) {
          return;
        }
        clearInterval(instance);
        isRunning = false;
      }
    });
    t.start();
    return t;
  }
};

module.exports = timer;