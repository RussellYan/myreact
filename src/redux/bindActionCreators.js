function bindActionCreator(actionCreator, dispatch) {
  // actionCreator是个函数，返回一个{type}
  return () => dispatch(actionCreator.apply(this, arguments));
}

function bindActionCreator(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  const boundActionCreators = {};
  for (let key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  }
}

export default bindActionCreator;