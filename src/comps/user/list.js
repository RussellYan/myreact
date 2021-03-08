import React, { Component } from 'react';
import { Link } from '../../react-router-dom';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }
  componentDidMount() {
    const users = this.props.getList();
    this.setState({users});
  }
  render() {
    const { users } = this.state;
    if (!users.length) {
      return '暂无数据'
    }
    return (
      <ul className='list-group'>
        {
          this.state.users.map(item => {
            return (
              <li className='list-group-item' key={item.id}>
                <Link to={{pathname:`/user/detail/${item.id}`, state: item}}>
                  {item.username}
                </Link>
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default List;