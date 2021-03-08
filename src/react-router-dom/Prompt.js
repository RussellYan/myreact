import React, { Component } from 'react';
import Context from './context';

class Prompt extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    this.context.history.block(null);
  }
  render() {
    const { history } = this.context;
    const { when, message } = this.props;
    if (when) {
      history.block(message);
    } else {
      history.block(null);
    }
    return (
      <div></div>
    );
  }
}

export default Prompt;