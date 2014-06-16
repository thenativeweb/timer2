'use strict';

var EventEmitter2 = require('eventemitter2').EventEmitter2,
    _ = require('underscore');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var variedTimeout = function (timeout, variation) {
  return timeout + getRandom(0 - variation, variation);
};

var timer = {
  create: function (timeout, options) {
    options = _.defaults(options || { }, {
      immediate: false,
      variation: 0
    });

    if (timeout < 0) {
      throw new Error('timeout must not be less than 0.');
    }

    if (options.variation < 0) {
      throw new Error('variation must not be less than 0.');
    }

    var t = new EventEmitter2();

    if (timeout === 0) {
      t.start = function () {};
      t.stop = function () {};
      return t;
    }

    var instance,
        isRunning = false;

    t.start = function () {
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
    };

    t.stop = function () {
      if (!isRunning) {
        return;
      }
      clearTimeout(instance);
      isRunning = false;
    };

    t.start();
    return t;
  }
};

module.exports = timer;
