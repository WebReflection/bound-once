const _ = new WeakMap;
const add = (context, methods) => {
  _.set(context, methods);
  return methods;
};
const set = (methods, method, bound) => {
  methods.set(method, bound);
  return bound;
};
export default (context, fn) => {
  const method = typeof fn === 'function' ? fn : context[fn];
  const methods = _.get(context) || add(context, new Map);
  return methods.get(method) || set(methods, method, method.bind(context));
};
