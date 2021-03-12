function createThunkMiddleWare(extraArguments) {
  return ({dispatch, getState}) => next => action => {
    if (typeof action == 'function') {
      action(dispatch, getState, extraArguments);
    } else {
      next(action);
    }
  }
}

const thunk = createThunkMiddleWare();
thunk.withExtraArgument = createThunkMiddleWare();
export default thunk;