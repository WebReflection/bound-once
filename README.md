# bound-once

A fast, memory efficient, and tiny solution to an evergreen problem.

## API

```js
const once = bound(
  context,  // the context to bind
  method    // a string, resolved as context[method]
            // or a function/method/callback to bind
);

once();     // will have the right context
```

### Usage Example

```js
import bound from 'bound-once';
// const bound = require('bound-once');
// <script src="//unpkg.com/bound">/*global boundOnce*/</script>

class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter;

// bound(counter, 'increment') always returns the same bound method
// so it is safe to use it for listeners, as it'll be added only once
document.body.addEventListener('click', bound(counter, 'increment'));
document.body.addEventListener('click', bound(counter, 'increment'));
document.body.addEventListener('click', bound(counter, 'increment'));

// example by passing a callback instead of a string
const {increment} = Counter.prototype;
bound(counter, 'increment') === bound(counter, increment);
```
