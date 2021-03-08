import React from 'react';
import {Route, Redirect} from '../react-router-dom';

const Protected = ({component: Comp, ...rest}) => {
  console.log('...rest: ', rest);
  return (
    <Route {...rest} render={
      props => {
        const isLogin = localStorage.getItem('login');
        return  isLogin ? <Comp {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />;
      }
    }/>
  );
}

export default Protected;