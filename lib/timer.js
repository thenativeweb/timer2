'use strict';

var _ = require('underscore'),
    evented = require('evented');

var timer = {
  create: function (timeout, options) {
    options = _.defaults(options || {}, { immediate: false });

    var t = evented({
      start: function () {
        var that = this;
        if (options.immediate) {
          process.nextTick(function () {
            that.emit('elapsed');
          });
        }
        setInterval(function () {
          that.emit('elapsed');
        }, timeout);
      }
    });
    t.start();
    return t;
  }
};

module.exports = timer;