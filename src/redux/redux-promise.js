import { isPromise } from './utils';

export default ({dispatch, getState}) => next => action => {
  if (isPromise(action.payload)) {
    return action.payload.then(result => {
      dispatch({...action, payload: result});
    }, error => {
      dispatch({...action, payload: error, error: true});
      return Promise.reject(error);
    })  
  }
  return next(action);
}