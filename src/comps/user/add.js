import React, { Component } from 'react';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.usernameRef = React.createRef();
    this.emailRef = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.usernameRef.current.value;
    const email = this.emailRef.current.value;
    const user = {id: Date.now(), username, email};
    this.props.addUser(user);
    this.props.history.push('/user/list');
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className='control-label'>用户名</label>
            <input className="form-control" ref={this.usernameRef} />
          </div>
          <div className="form-group">
            <label className='control-label'>邮箱</label>
            <input className="form-control" ref={this.emailRef} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-primary'>提交</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Add;