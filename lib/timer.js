'use strict';

var _ = require('underscore'),
    evented = require('evented');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var variedTimeout = function (timeout, variation) {
  return timeout + getRandom(0 - variation, variation);
};

var timer = {
  create: function (timeout, options) {
    options = _.defaults(options || {}, {
      immediate: false,
      variation: 0
    });

    if (timeout < 0) {
      throw new Error('timeout must not be less than 0.');
    }

    if (options.variation < 0) {
      throw new Error('variation must not be less than 0.');
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
        var elapsed = function () {
          that.emit('elapsed');
          instance = setTimeout(elapsed, variedTimeout(timeout, options.variation));
        };
        instance = setTimeout(elapsed, variedTimeout(timeout, options.variation));
        isRunning = true;
      },
      stop: function () {
        if (!isRunning) {
          return;
        }
        clearTimeout(instance);
        isRunning = false;
      }
    });
    t.start();
    return t;
  }
};

module.exports = timer;