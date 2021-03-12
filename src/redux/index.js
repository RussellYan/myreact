import createStore from './creatStore';
import bindActionCreator from './bindActionCreators';

// 每一次reducer返回一个状态, combineReducers将每个reducer合并
// 例如：const reducers = combineReducers({counter1: reducer1, counter2: reducer2})
function combineReducers(reducers) {
  const reducersNames = Object.keys(reducers);
  return (state = {}, action) => {
    const nextState = {};
    for (let i = 0; i < reducersNames.length; i++) {
      const name = reducersNames[i];
      const reducer = reducers[name];
      const preStateForThisName = state[name];
      const nextStateForThisName = reducer(preStateForThisName, action);
      nextState[name] = nextStateForThisName;
    }
    return nextState;
  }
}

function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = () => {
      throw new Error('dispatch现在还不能用!');
    }
    const middlewareApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareApi));
    dispatch = compose(...chain)(store.dispatch);
    return {...store, dispatch};
  }
}

// 合并中间件, 执行顺序类似于koa的洋葱模型
// 使用： compose(middleware1, middleware2....)(args)
function compose(...funcs) {
  const len = funcs.length;
  if (!len) {
    return args => args;
  } else if (len === 1) {
    return funcs[0];
  } else {
    return funcs.reduce((prevFunc, nextFunc) => (...args) => prevFunc(nextFunc(...args)));
  }
}

// 实际中间件写法：
// function logger({getState}) {
//   return function(next) { // 返回给下一个中间件当做参数
//     return function(action) {
//       console.log('老状态: ', JSON.stringify(getState()));
//       next(action);
//       console.log('新状态: ', JSON.stringify(getState()));
//     }
//   }
// }

export {
  createStore, // 创建store
  combineReducers, // 合并reducers
  bindActionCreators, // 把actionCreator和dispatch方法绑定在一起
  applyMiddleware
}