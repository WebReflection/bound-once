self.boundOnce = (function (exports) {
  'use strict';

  var _ = new WeakMap();

  var add = function add(context, methods) {
    _.set(context, methods);

    return methods;
  };

  var set = function set(methods, method, bound) {
    methods.set(method, bound);
    return bound;
  };

  var index = (function (context, fn) {
    var method = typeof fn === 'function' ? fn : context[fn];
    var methods = _.get(context) || add(context, new Map());
    return methods.get(method) || set(methods, method, method.bind(context));
  });

  

  return index;

}({}));
