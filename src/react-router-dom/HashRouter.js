import React, { Component } from 'react';
import Context from "./context";

class HashRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        pathname: window.location.hash.slice(1),
        state: null
      }
    };
    this.locationState = null;
  }
  componentDidMount() {
    window.location.hash = window.location.hash || '/';
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1),
          state: this.locationState
        }
      })
    });
  }
  render() {
    const that = this;
    const { location } = this.state;
    console.log('location: ', location);
    const value = {
      location,
      history: {
        // 定义一个history对象，有一个push方法用来跳转路径
        push(arg) {
          if (arg && typeof arg === 'object') {
            that.locationState = arg.state;
            window.location.hash = arg.pathname;
          } else if (typeof arg === 'string') {
            that.locationState = null;
            window.location.hash = arg;
          }

        }
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default HashRouter;