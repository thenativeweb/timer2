'use strict';

var _ = require('underscore'),
    evented = require('evented');

var timer = {
  create: function (timeout, options) {
    options = _.defaults(options || {}, { immediate: false });

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