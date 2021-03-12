import { isPlainObject, InitActionTypes } from './utils';

export default function(reducer, preloadedStates = {}) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer should be a function');
  }
  // 当前reducer
  let currentReducer = reducer;
  // 当前state
  let currentState = preloadedStates;
  // 用来存储当前的监听函数
  const currentListeners = [];
  // 获取状态
  const getState = (key) =>key ? currentState[key] : currentState;
  // 动作派发
  const dispatch = (action, payload) => {
    if (!isPlainObject(action)) {
      throw new Error('action should be a plain object');
    }
    if (typeof action.type === 'undefined') {
      throw new Error('type should not be undefined');
    }
    // 调用reducer生成新状态
    currentState = currentReducer(currentState, action);
    // 通知所有监听者
    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];
      listener();
    }
    // 返回action
    return action;
  }
  // 订阅函数，会返回一个取消订阅的函数
  const subscribe = listener => {
    let subscribed = true;
    currentListeners.push(listener);
    const unsubscribe = () => {
      if (!subscribed) return;
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
      subscribed = false;
    }
    return unsubscribe;
  }
  // 让初始状态initialSate生效
  dispatch({type: InitActionTypes.INIT});
  return {
    getState,
    subscribe,
    dispatch
  }

}