import { createDOM } from './react-dom';

export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(partialState) {
    // 合并状态
    this.state = { ...this.state, ...partialState };
    // 实例render函数返回新的vdom
    const renderVdom = this.render();
    console.log('updateClassInstance renderVdom: ', renderVdom);
    updateClassInstance(this, renderVdom);
  }
}

function updateClassInstance(classInstance, renderVdom) {
  // 上一次updateClassComponent挂在实例上的dom
  let oldDom = classInstance.dom;
  let newDom = createDOM(renderVdom);
  console.log('oldDom: ', oldDom, oldDom.parentNode, newDom);
  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;
}