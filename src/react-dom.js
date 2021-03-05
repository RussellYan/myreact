import { addEvant } from './event';

function render(vdom, container) {
  // console.log('vdom: ===> ', vdom, {...vdom});
  const dom = createDOM(vdom);
  // console.log('dom: ===> ', dom);
  container.appendChild(dom);
}

export function createDOM(vdom) {
  if (['number', 'string'].includes(typeof vdom)) {
    return document.createTextNode(vdom.toString());
  } else if (!vdom) {
    return document.createTextNode('');
  } else {
    const { type, props = {}, ref } = vdom;
    let dom;
    if (typeof type === 'function') {
      if (type.isReactComponent) {
        return updateClassComponent(vdom);
      } else {
        return updateFunctionComponent(vdom);
      }
    } else {
      dom = document.createElement(type);
    }
    // 将props设置到真实dom
    updateProps(dom, props);
    // 处理children
    console.log('debug:====>>>>>', props);
    if (props.children || props.children === 0) {
      reconcileChildren(props.children, dom);
    }
    if (ref) {
      ref.current = dom;
    }
    // vdom.dom = dom;
    return dom;
  }
}

function updateProps(dom, props) {
  for (let key in props) {
    if (key === 'children') continue;
    if (key === 'style') {
      let styleObj = props[key];
      for (let okey in styleObj) {
        dom.style[okey] = styleObj[okey];
      }
    } else if (key.startsWith('on') && /[A-Z]/.test(key.substr(2, 1))) { 
      // 绑定事件
      // dom[key.toLowerCase()] = props[key];
      // 讲事件委托给document
      addEvant(dom, key.toLowerCase(), props[key]);
     } else {
      dom[key] = props[key];
    }
  }
}

function reconcileChildren(children, parentDom) {
  const childrenType = typeof children;
  if (['number', 'string'].includes(childrenType)) {
    parentDom.textContent = children.toString();
  } else if (Array.isArray(children)) {
    children.forEach(child => render(child, parentDom));
  } else if (childrenType === 'object'){
    render(children, parentDom);
  } else {
    parentDom.textContent = children ? children.toString() : '';
  }
}

function updateFunctionComponent(vdom) {
  const { type, props } = vdom;
  // 可能是原生虚拟DOM，也可能是组件
  const renderVdom = type(props);
  // console.log('render function comp: ', type.name, renderVdom);
  return createDOM(renderVdom);
}

/**
 * 1.先创建一个类组件的实例 new Comp(props) this.porps = props
 * 2.调用实例的render方法得到一个react元素
 * 3.把这个react元素转成真实的dom元素插入到页面中
 * @param {*} vdom 
 */
function updateClassComponent(vdom) {
  const { type, props } = vdom;
  const classInstance = new type(props);
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  // 虚拟dom {type: div}, 而classInstance是 {type: ClassComponentName}
  const renderVdom = {...classInstance.render()};
  // 真实dom;
  const dom = createDOM(renderVdom);
  // 这个虚拟Dom的dom属性和render方法返回的虚拟Dom的dom属性都指向真实Dom
  console.log('renderVdom: ===>', Object.isExtensible(renderVdom), vdom.classInstance, vdom.dom);
  vdom.dom = renderVdom.dom = dom;
  // 让组件实例的老vdom属性指向本次render出来的渲染，留待后面做dom对比时使用
  classInstance.oldVdom = renderVdom;
  // 让类组件实例上挂一个dom,指向类组件的实例的真实dom, 后面组件更新setState会用到
  classInstance.dom = dom;
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }
  return dom;
}

/**
 * 找到新旧vdom的差异，吧相应的差异更新到真实的dom上
 * @param {*} parentDom 
 * @param {*} oldVdom 
 * @param {*} newVdom
 */
export function compareTwoVdom(parentDom, oldVdom, newVdom) {
  if (!oldVdom && !newVdom) {
    return null;
  } else if (oldVdom && !newVdom) { // 意味着节点被删除
    const currentDom = oldVdom.dom;
    parentDom.removeChild(currentDom);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    return null;
  } else if (!oldVdom && newVdom) { // 意味着新建节点
    const newDom = createDOM(newVdom);
    newVdom.dom = newDom;
    // TODO 待优化
    parentDom.appendChild(newDom);
    return newVdom;
  } else {
    // dom diff
    updateElement(oldVdom, newVdom);
    return newVdom
  }
}

/**
 * Dom-diff的时候，React为了优化性能有一些假设条件:
 * 1.不考虑跨层移动的情况
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
function updateElement(oldVdom, newVdom) {
  // 如果走到这里，意味着要复用老的dom节点
  let currentDom = newVdom.dom = oldVdom.dom;
  newVdom.classInstance = oldVdom.classInstance;
  if (typeof oldVdom.type === 'string') { // 原生dom类型
    updateProps(currentDom, oldVdom.props, newVdom.props);
    updateChildren(currentDom, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') { // 类组件类型
    updateClassInstance(oldVdom, newVdom);
  }
}

function updateChildren(parentDom, oldChildrenVdom, newChildrenVdom) {
  const oType = typeof oldChildrenVdom;
  const nType = typeof newChildrenVdom;
  const txtDomTypes = ['string', 'number'];
  if (txtDomTypes.includes(oType) && txtDomTypes.includes(nType)) {
    if (oldChildrenVdom !== newChildrenVdom) {
      parentDom.innerText = newChildrenVdom;
    }
    return;
  }
  const maxLength = Math.max(oldChildrenVdom.length, newChildrenVdom.length);
  // TODO dom-diff的优化
  for (let i = 0; i < maxLength; i++) {
    compareTwoVdom(parentDom, oldChildrenVdom[i], newChildrenVdom[i]);
  }
}

function updateClassInstance(oldVdom, newVdom) {
  const classInstance = oldVdom.classInstance;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps();
  }
  classInstance.updater.emitUpdate(newVdom.porps);
  
}

const ReactDom = { render, createDOM };
export default ReactDom;