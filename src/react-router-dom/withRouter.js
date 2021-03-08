import React from 'react';
import Route from './Route';

const WithRouter = (WrappedComponent) => {
  // return props => (
  //   <Route render={props => <WrappedComponent {...props}/>} />
  // );
  // 或者
  return  props => <Route component={WrappedComponent}/>;
}

export default WithRouter;