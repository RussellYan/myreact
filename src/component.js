import { createDOM } from './react-dom';

/**
 * 什么时候用类，什么时候用对象？
 * 单例用对象就够了，如果需要很多对象或者实例就用类
 */
export const updateQueue = {
  updaters: [], // 更新器的数组
  isBatchingUpdate: false, // 是否处于批量更新模式
  add(updater) { // 增加一个更新器
    this.updaters.push(updater);
  },
  batchUpdate() { // 强制实现批量组件更新
    this.updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false;
  }
}
// 更新器
class Updater {
  constructor(classInstance) {
    // class-component 实例
    this.classInstance = classInstance;
    // 等待更新的状态
    this.pendingStates = [];
  }

  addState(partialState) {
    // 先把分装台添加到 pendingStates 中
    this.pendingStates.push(partialState);
    // 如果当前处于批量更新模式，也就是异步更新模式，把当前的update实例放到updateQueue里
    if (updateQueue.isBatchingUpdate) {
      updateQueue.add(this);
    } else {
      // 如果当前是同步更新，则直接更新组件
      this.updateComponent();
    }
  }
  
  updateComponent() {
    const { classInstance, pendingStates } = this;
    if (pendingStates.length) {
      classInstance.state = this.getState();
      // 组件强制更新
      classInstance.forceUpdate();
    }
  }

  getState() {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    if (pendingStates.length) {
      pendingStates.forEach(nextState => {
        if (typeof nextState === 'function') {
          nextState = nextState(state);
        }
        state = { ...state, ...nextState };
      });
      pendingStates.length = 0;
    }
    return state;
  }

}




export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    // 为每一个组件实例配一个Updater类的实例
    this.updater = new Updater(this);
  }

  setState(partialState) {
    // 合并状态
    this.state = { ...this.state, ...partialState };
    // 实例render函数返回新的vdom
    const renderVdom = this.render();
    updateClassInstance(this, renderVdom);
  }

  forceUpdate() {
    updateClassInstance(this, this.render());
  }
}

function updateClassInstance(classInstance, renderVdom) {
  // 上一次updateClassComponent挂在实例上的dom
  let oldDom = classInstance.dom;
  let newDom = createDOM(renderVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;
}