# bound-once

[![Build Status](https://travis-ci.com/WebReflection/bound-once.svg?branch=master)](https://travis-ci.com/WebReflection/bound-once) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/bound-once/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/bound-once?branch=master)

<sup>**Social Media Photo by [Mattias Olsson](https://unsplash.com/@mattiaswolsson) on [Unsplash](https://unsplash.com/)**</sup>

A fast, memory efficient, and tiny solution to an evergreen problem.

Alternatively, you can check [bind.for](https://github.com/WebReflection/bind.for#readme) utility, which is definitively faster, but it has not ideal ergonomics.

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

### Partial Application

```js
class Component extends HTMLElement {
  // instead of assigning N methods bound
  // just assign once and happily bind it after
  #bound = bound.bind(null, this);
  connectedCallback() {
    this.addEventListener('click', this.#bound('onClick'));
    this.addEventListener('change', this.#bound('onChange'));
    this.addEventListener('input', this.#bound(this.onInput));
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.#bound('onClick'));
    this.removeEventListener('change', this.#bound('onChange'));
    this.removeEventListener('input', this.#bound(this.onInput));
  }
  // any method
  onClick() {}
  onChange() {}
  onInput() {}
}
```

This [Custom Element with closed ShadowDOM](https://codepen.io/WebReflection/pen/qBZMRxy?editors=0010) is also another practical application, avoiding constant listeners changes per each render call.
