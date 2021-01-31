// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactDOM from './react-dom';

import ClassComp from './comps/classComp';

// const element = React.createElement(
//   'h1', 
//   {
//     className: 'title',
//     style: {
//       color: 'red'
//     }
//   },
//   React.createElement('span', null, 'hello, '),
//   'my react'
// );

// babel会自动将标签转化为react元素对象
const element = <ClassComp name='classComp' />;
// console.log('element ========> ', element.type.isReactComponent, element);

ReactDOM.render(
  element,
  document.getElementById('root')
);