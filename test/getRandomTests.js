'use strict';

var assert = require('assertthat');

var getRandom = require('../lib/getRandom');

suite('getRandom', function () {
  test('is a function.', function (done) {
    assert.that(getRandom).is.ofType('function');
    done();
  });

  test('throws an error if min is missing.', function (done) {
    assert.that(function () {
      getRandom();
    }).is.throwing('undefined is not: number');
    done();
  });

  test('throws an error if max is missing.', function (done) {
    assert.that(function () {
      getRandom(1);
    }).is.throwing('undefined is not: number');
    done();
  });

  test('returns a random number between min and max.', function (done) {
    var number = getRandom(1, 10);
    assert.that(number).is.between(1, 10);
    done();
  });
});
