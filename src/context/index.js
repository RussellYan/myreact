import React, {Component} from 'react';
// 骗过React
const REACT_CONTEXT_TYPE = Symbol.for('react.context');
const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const createContext = (defaultValue) => {
  class Provider extends Component {
    static value = defaultValue;
    $$typeof = REACT_PROVIDER_TYPE;
    constructor(props) {
      super(props);
      Provider.value = props.value;
      this.state = {value: props.value};
    }
    static getDerivedStateFromProps(props, state){
      Provider.value = props.value;
      return {value: props}
    }
    render() {
      return this.props.children;
    }
  }

  class Consumer extends Component {
    render() {
      return this.props.children(Provider.value);
    }
  }

  return {$$typeof: REACT_CONTEXT_TYPE, Provider, Consumer};
}

export default createContext;

// // 以上的只能跑起基本的demo，还有很多问题没有解决, 参考https://juejin.cn/post/6844903936197935112