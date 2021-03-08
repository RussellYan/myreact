import React, { Component } from 'react';
import Context from './context';

class Link extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  jump = () => {
    const { history: { push } } = this.context;
    push(this.props.to);
  }
  render() {
    // return <a href={`#${this.props.to}`}>{this.props.children}</a> // 只适合哈希路由
    return (
      <a onClick={this.jump} {...this.props}>{this.props.children}</a>
    );
  }
}

export default Link;