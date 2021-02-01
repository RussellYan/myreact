
import { Component } from './component';

function createElement(type, config, children) {
  let ref;
  if (config) {
    delete config._owner;
    delete config._store;
    ref = config.ref;
    delete config.reg;
  }
  let props = {...config};
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  // children可能是数组也可能是对象、字符串、null
  props.children = children;
  return {
    type,
    props,
    ref
  }
};

function createRef(params) {
  return { current: null };
}

const React = {
  createElement,
  Component,
  createRef
};
export default React;