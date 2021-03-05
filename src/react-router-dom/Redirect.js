import React, { Component } from 'react';
import Content from './context';

class Redirect extends Component {
  static contextType = RouterContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    this.context.history.push(this.props.to);
    return null;
  }
}

export default Redirect;