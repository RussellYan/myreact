import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogin = () => {
    console.log(this.props);
    const { location: { state }, history: { push } } = this.props;
    localStorage.setItem('login', 'true');
    if (state && state.from) {
      push(state.from);
      return;
    }
    push('/')
  }
  render() {
    return (
      <div>
        <button onClick={this.handleLogin} className='btn btn-primary'>Login</button>
      </div>
    );
  }
}

export default Login;