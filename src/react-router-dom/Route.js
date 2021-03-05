import React, { Component } from 'react';
import Context from './context';
import { pathToRegexp } from 'path-to-regexp';

class Route extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pathname } = this.context.location;
    const { path = '/', component: Comp, exact = false } = this.props;
    const paramNames = [];
    const regexp = pathToRegexp(path, paramNames, {end: exact});
    const match = pathname.match(regexp);
    const compProps = {
      location: this.context.location
    }
    return match ? <Comp {...compProps}/> : null;
  }
}

export default Route;