// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactDOM from './react-dom';

const element = React.createElement(
  'h1', 
  {
    className: 'title',
    style: {
      color: 'red'
    }
  },
  React.createElement('span', null, 'hello, '),
  'my react'
);
ReactDOM.render(
  element,
  document.getElementById('root')
);