import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('home => ', this.props.location)
    return (
      <div>Home</div>
    );
  }
}

export default Home;