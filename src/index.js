// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactDOM from './react-dom';

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
function Hello(props) {
  return <h2>hello, {props.name}</h2>
}
function Welcom(props) {
  return <Hello {...props} />
}
const element = <Welcom name='functonComponent' />
console.log(element);
ReactDOM.render(
  element,
  document.getElementById('root')
);