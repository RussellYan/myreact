function createElement(type, config, children) {
  if (config) {
    delete config._owner;
    delete config._store;
  }
  let props = {...config};
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  // children可能是数组也可能是对象、字符串、null
  props.children = children;
  return {
    type,
    props
  }
};

const React = { createElement };
export default React;