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
    const value = {
      location,
      history: {
        // 定义一个history对象，有一个push方法用来跳转路径
        push(arg) {
          const type = typeof arg;
          const isObject = type && type === 'object';
          if (that.block) {
            const confirm = confirm(that.block(isObject ? arg : {pathname: arg} ));
            if (confirm) return;
          }
          if (isObject) {
            that.locationState = arg.state;
            console.log(arg.state);
            window.location.hash = arg.pathname;
          } else if (type === 'string') {
            that.locationState = null;
            window.location.hash = arg;
          }

        }
      },
      block(message) {
        that.block = message;
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