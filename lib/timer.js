'use strict';

var util = require('util');

var ensure = require('node-ensurethat'),
    EventEmitter2 = require('eventemitter2').EventEmitter2;

var getRandom = require('./getRandom');

var Timer = function () {
  var args = ensure.that(arguments).are({
    timeout: ensure.number(),
    options: [ ensure.object(), {}]
  });

  this.timeout = args.timeout;
  this.timer = undefined;

  this.isRunning = false;

  this.immediate = !!args.options.immediate;
  this.variation = args.options.variation || 0;

  if (this.immediate) {
    this.tick();
  }

  this.start();
};

util.inherits(Timer, EventEmitter2);

Timer.prototype.tick = function () {
  var that = this;

  var timeout = that.timeout + getRandom(0 - that.variation, that.variation);

  process.nextTick(function () {
    that.emit('tick');
  });

  that.timer = setTimeout(function () {
    that.tick();
  }, timeout);
};

Timer.prototype.start = function () {
  var that = this;

  if (that.isRunning) {
    return;
  }

  that.isRunning = true;
  that.timer = setTimeout(function () {
    that.tick();
  }, that.timeout);
};

Timer.prototype.stop = function () {
  this.isRunning = false;
  clearTimeout(this.timer);
};

module.exports = Timer;
