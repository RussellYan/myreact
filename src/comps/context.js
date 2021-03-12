import React from 'react';
import createContext from '../context';
const { Provider, Consumer } = createContext();
const Parent = () => {
  const name = 'russell';
  return (
    <Provider value={{name}}>
      <Child />
    </Provider>
  );
}

const Child = function(props) {
  console.log(props);
  return <Child1 />
}

const Child1 = function() {
  return (
    <Consumer>
      {
        props => <div>{props.name}</div>
      }
    </Consumer>
  )
}

export default Parent;