const bound = require('../cjs');

const object = {};
const fn = bound(object, method);

console.assert(fn() === object, 'unexpected return');

const own = {method};
console.assert(bound(own, 'method') === bound(own, 'method'), 'unexpected duplication');

function method() {
  return this;
}
