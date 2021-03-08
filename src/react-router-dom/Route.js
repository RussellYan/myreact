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
    const { path = '/', component: Comp, exact = false, render, children } = this.props;
    let paramNames = [];
    const regexp = pathToRegexp(path, paramNames, {end: exact});
    const match = pathname.match(regexp);
    const compProps = {
      ...this.props,
      location: this.context.location,
      history: this.context.history
    }
    if (match) {
      paramNames = paramNames.map(item => item.name);
      let [url, ...values] = match;
      let params = {};
      for (let i = 0; i< paramNames.length; i++) {
        params[paramNames[i]] = values[i]
      }
      compProps.match = {
        isExact: path === url,
        params,
        path,
        url
      }
      if (Comp) {
        return <Comp {...compProps}/>;
      } else if (render) {
        return render(compProps);
      } else if (children) {
        return children(compProps);
      }
    } else if (children) {
      return children(compProps);
    }
    return null;
  }
}

export default Route;