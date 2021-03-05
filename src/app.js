import React, { Component } from 'react';
import {HashRouter, Route, Link} from './react-router-dom';
// import Header from './comps/Header';
import Home from './comps/Home';
import User from './comps/User';
import Profile from './comps/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <>
          <nav>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/user'>User</Link>&nbsp;
            <Link to={{pathname: '/profile', state: {title: 'profile'}}}>Profile</Link>
          </nav>
          <Route path='/' component={Home} exact />
          <Route path='/user' component={User}  />
          <Route path='/profile' component={Profile}  />
        </>
      </HashRouter>
    );
  }
}

export default App;