import React, { Component } from 'react';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    let user = this.props.location.state;
    if (!user) {
      const id = this.props.match.params.id;
      if (id) {
        user = this.props.getUser(id);
      }
    }
    this.setState({ user });
  }
  render() {
    const { user = {} } = this.state;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            user && (
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            )
          }

        </tbody>
      </table>
    );
  }
}

export default Detail;