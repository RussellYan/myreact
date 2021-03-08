import React from 'react';
import { Route, Link } from '../react-router-dom';

const MenuLink = ({to, exact, children}) => {
  return (
    <Route path={to} exact={exact} children={
      props => {
        console.log('match====> ', props.match, to);
        return (
          <Link to={to} className={props.match ? 'active' : ''}>{children}</Link>
        );
      }
    } />
  );
}

export default MenuLink;