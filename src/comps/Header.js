import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <a href='/#/home'>Home</a>
        &nbsp;
        <a href='/#/home'>User</a>
        &nbsp;
        <a href='/#/home'>Profile</a>
      </div>
    );
  }
}

export default Header;