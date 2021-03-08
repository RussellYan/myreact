import React, { Component } from 'react';
import {Route, Link, Redirect, Switch} from '../react-router-dom';
import UserList from './user/list';
import UserAdd from './user/add';
import UserDetail from './user/detail';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getList = () => {
    const userStr = localStorage.getItem('userList');
    const users = userStr ? JSON.parse(userStr) : [];
    return users;
  }
  
  addUser = (user) => {
    const oldUsers = this.getList();
    oldUsers.push(user);
    localStorage.setItem('userList', JSON.stringify(oldUsers));
  }

  getUser = (id) => {
    const users = this.getList();
    const user = users.find(item => +item.id === +id);
    return user;
  }

  render() {
    const uProps = {
      addUser: this.addUser,
      getList: this.getList
    }
    return (
      <div className='row'>
        <div className="col-md-2">
          <ul className="nav nav-stacked">
            <li>
              <Link to='/user/list'>用户列表</Link>
            </li>
            <li>
              <Link to='/user/add'>添加用户</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-10">
          <Switch>
            <Route path='/user/list' component={UserList} {...uProps}/>
            <Route path='/user/add' component={UserAdd} {...uProps}/>
            <Route path='/user/detail/:id' component={UserDetail} getUser={this.getUser}/>
            <Redirect to='/user/list' />
          </Switch>
        </div>
      </div>
    );
  }
}

export default User;