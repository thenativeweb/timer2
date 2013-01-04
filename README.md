# timer

timer is an evented time base.

## Installation

At the moment, installation of this module must be made manually.

## Quick start

The first thing you need to do is to integrate timer into your application. For that add a reference to the `timer` module.

```javascript
var timer = require('timer');
```

### Creating timers

To set up a new timer you need to call the timer module's `create` function and specify the number of milliseconds to wait between two ticks.

```javascript
var t = timer.create(100);
```

Please note that the timer does not start immediately, but waits for the specified number of milliseconds before emitting the first tick.

If you want to start a timer immediately you need to provide an `options` object and set its `immediate` property to `true`.

```javascript
var t = timer.create(100, { immediate: true });
```

### Handling ticks

Whenever the timer ticks it emits an `elapsed` event. You can bind to that event using the timer's `on` function to handle it.

```javascript
t.on('elapsed', function () {
  // ...
});
```

You can also use a more compact notation by combining the calls to `create` and `on` into a single line using a fluent style.

```javascript
timer.create(100, { immediate: true }).on('elapsed', function () {
  // ...
});
```

## Running the tests

timer has been developed using TDD. To run the tests, go to the folder where you have installed timer to and run `npm test`. You need to have [mocha](https://github.com/visionmedia/mocha) installed.

    $ npm test