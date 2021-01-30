
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

function createDOM(vdom) {
  if (!vdom) {
    return '';
  } else if (['number', 'string'].includes(typeof vdom)) {
    return document.createTextNode(vdom);
  } else {
    const { type, props } = vdom;
    const dom = document.createElement(type);
    // 将props设置到真实dom
    updateProps(dom, props);
    // 处理children
    if (props.children) {
      reconcileChildren(props.children, dom);
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

const reactDom = { render };
export default reactDom;