'use strict';

var events = require('events'),
    util = require('util');

var ensure = require('ensurethat');

var getRandom = require('./getRandom');

var EventEmitter = events.EventEmitter;

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

util.inherits(Timer, EventEmitter);

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

Timer.prototype.destroy = function () {
  this.stop();
  this.removeAllListeners();
};

module.exports = Timer;
