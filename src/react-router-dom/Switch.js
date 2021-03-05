import React, { Component } from 'react';
import Context from './context';
import { pathToRegexp } from 'path-to-regexp';

class Switch extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pathname } = this.context.location;
    const { children } = this.props;
    const childrenArray = Array.isArray(children) ? children : [children];
    for (let i=0; i< childrenArray.length; i++) {
      const child = childrenArray[i];
      const { path, exact } = child.props;
      const paramNames = [];
      const regexp = pathToRegexp(path, paramNames, {end: exact});
      const match = pathname.match(regexp);
      if (match) {
        return  child;
      }
      
    }
    return null;
  }
}

export default Switch;