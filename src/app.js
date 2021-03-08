import React, { Component } from 'react';
import {HashRouter, Route, Link} from './react-router-dom';
// import Header from './comps/Header';
import Home from './comps/Home';
import User from './comps/User';
import Profile from './comps/Profile';
import Login from './comps/Login';
import Protected from './comps/Protected';
import MenuLink from './comps/MenuLink';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <>
          <nav className='navbar navbar-inverse'>
            <div className="container-fluid">
              <div className='navbar-heading'>
                <div className="navbar-brand">
                  后台管理
                </div>
              </div>
              <ul className='nav navbar-nav'>
                <li><MenuLink to='/' exact>首页</MenuLink></li>
                <li><MenuLink to='/user'>用户管理</MenuLink></li>
                <li><MenuLink to='/profile'>个人中心</MenuLink></li>
                <li><MenuLink to='/login'>登录</MenuLink></li>
                {/* <li><Link to='/'>首页</Link></li>
                <li><Link to='/user'>用户管理</Link></li>
                <li><Link to={{pathname: '/profile', state: {title: 'profile'}}}>个人中心</Link></li>
                <li><Link to='/login'>登录</Link></li> */}
              </ul>
            </div>
          </nav>
          <div className='container'>
            <div className="row">
              <div className="col-md-12">
                <Route path='/' component={Home} exact />
                <Route path='/user' component={User}  />
                <Protected path='/profile' component={Profile}  />
                <Route path='/login' component={Login} />
              </div>
            </div>
          </div>

        </>
      </HashRouter>
    );
  }
}

export default App;