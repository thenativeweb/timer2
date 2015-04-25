'use strict';

var ensure = require('ensurethat');

var getRandom = function () {
  var args = ensure.that(arguments).are({
    min: ensure.number(),
    max: ensure.number()
  });

  return Math.floor(Math.random() * (args.max - args.min + 1)) + args.min;
};

module.exports = getRandom;
