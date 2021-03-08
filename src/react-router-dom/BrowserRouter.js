import React, { Component } from 'react';
import Context from "./context";

class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        pathname: window.location.pathname,
        state: null
      }
    };
  }
  componentDidMount() {
    let pushState = window.history.pushState;
    // 浏览器没有onpushstate事件，这里重写了pushstate事件
    window.history.pushState = (state, title, url) => {
      pushState.call(window.history, state, title, url);
      window.onpushstate.call(this, state, url);
    }

    window.onpopstate = function(event) {
      if (this.block) {
        const confirm = window.confirm(this.block(this.state.location));
        if (!confirm) return;
      }
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.pathname,
          state: event.state
        }
      })
    }
    window.onpushstate = (state, pathname) => {
      this.setState({
        location: {
          ...this.state.location,
          pathname,
          state
        }
      })
    }
    window.block = () => {
      // return window.confirm(this.block(typeof to === 'object' ? to : {pathname: to}));
    }
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
            console.log(arg.state);
            // window.location.hash = arg.pathname;
            window.history.pushState(state, '', pathname);
          } else if (type === 'string') {
            // window.location.hash = arg;
            window.history.pushState(null, '', to);
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

export default BrowserRouter;