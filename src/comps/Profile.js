import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    console.log('~~~~~~~~~ ', this.props);
    localStorage.removeItem('login');
    this.props.history.push({pathname: '/login', state: {from: '/profile'}})
  }
  render() {
    return (
      <div>
        <h3>Profile</h3>
        <button onClick={this.logout}>退出</button>
      </div>
    );
  }
}

export default Profile;