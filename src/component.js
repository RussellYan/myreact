import { createDOM, compareTwoVdom } from './react-dom';

/**
 * 什么时候用类，什么时候用对象？
 * 单例用对象就够了，如果需要很多对象或者实例就用类
 */
export const updateQueue = {
  updaters: new Set(), // 更新器的集合
  isBatchingUpdate: false, // 是否处于批量更新模式
  add(updater) { // 增加一个更新器
    this.updaters.add(updater);
  },
  batchUpdate() { // 强制实现批量组件更新
    this.updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false;
    this.updaters.clear();
  }
}
// 更新器
class Updater {
  constructor(classInstance) {
    // class component 实例
    this.classInstance = classInstance;
    // 等待更新的状态
    this.pendingStates = [];
  }

  addState(partialState) {
    // 先把分状态添加到 pendingStates 中
    this.pendingStates.push(partialState);
    // 管理 props、state更新
    this.emitUpdate();
  }
  // TODO
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    // 如果当前处于批量更新模式，也就是异步更新模式，把当前的update实例放到updateQueue里
    if (updateQueue.isBatchingUpdate && !this.nextProps) {
      updateQueue.add(this);
    } else {
      // 如果当前是同步更新或者有nextProps，则直接更新组件
      this.updateComponent();
    }
  }
  updateComponent() {
    const { classInstance, pendingStates, nextProps } = this;
    if (pendingStates.length) {
      // classInstance.state = this.getState();
      // classInstance.forceUpdate();
      const nextState = this.getState();
      shouldUpdate(classInstance, nextProps, nextState);
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
    this.updater.addState(partialState);
  }

  // 在 updater中调用
  forceUpdate() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate()
    }
    const newVdom = this.render();
    // updateClassInstance(this, newVdom);
    const parentNode = this.oldVDom.dom.parentNode;
    const currenVdom = compareTwoVdom(parentNode, this.oldVDom, newVdom);
    this.oldVdom = currenVdom;
    if (this.componentDidUpdate) {
      this.componentDidUpdate();
    }
  }

}

function updateClassInstance(classInstance, renderVdom) {
  // 上一次updateClassComponent挂在实例上的dom
  let oldDom = classInstance.dom;
  let newDom = createDOM(renderVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;
  if (classInstance.componentDidUpdate) {
    classInstance.componentDidUpdate()
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  if (nextProps) {
    classInstance.props = nextProps;
  }
  // 要先更新state
  classInstance.state = nextState;
  const { shouldComponentUpdate, props } = classInstance;
  // 如果shouldComponentUpdate返回false,则不更新
  if (shouldComponentUpdate && !shouldComponentUpdate(props, nextState)) {
    return;
  }
  classInstance.forceUpdate();
}