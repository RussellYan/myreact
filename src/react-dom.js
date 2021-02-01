import { addEvant } from './event';

function render(vdom, container) {
  // console.log('vdom: ===> ', vdom);
  const dom = createDOM(vdom);
  // console.log('dom: ===> ', dom);
  container.appendChild(dom);
}

export function createDOM(vdom) {
  if (['number', 'string'].includes(typeof vdom)) {
    return document.createTextNode(vdom);
  } else if (!vdom) {
    return document.createTextNode('');
  } else {
    const { type, props, ref } = vdom;
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
    if (props.children) {
      reconcileChildren(props.children, dom);
    }
    if (ref) {
      ref.current = dom;
    }
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
    parentDom.textContent = children;
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
  const renderVdom = classInstance.render();
  // console.log('render class comp: ', type.name, renderVdom);
  const dom = createDOM(renderVdom);
  // 让类组件实例上挂一个dom,指向类组件的实例的真实dom, 后面组件更新setState会用到
  classInstance.dom = dom;
  return dom;
}

const ReactDom = { render, createDOM };
export default ReactDom;