import React from 'react';

class Welcome extends React.Component {
  static isReactComponent = true;
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>hello, {this.props.name}</h1>
  }
}

export default Welcome;