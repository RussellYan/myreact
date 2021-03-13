import React from 'react';
import createContext from '../context';
const context = createContext();
const { Provider, Consumer } = context;
// const Parent = () => {
//   const name = 'russell';
//   return (
//     <Provider value={{name}}>
//       <Child />
//       <CC />
//     </Provider>
//   );
// }

class Parent extends React.Component {
  render() {
    const name = 'russell';
    return (
      <Provider value={{name}}>
        <Child />
        <CC />
      </Provider>
    );
  }
}

const Child = function(props) {
  console.log(props);
  return (
    <div><Child1 /></div>
  )
}

class CC extends React.Component{
  static contextType = context;
  render() {
    console.log('CC===> ', CC.contextType.Provider.value);
    return <h1>CC= {CC.contextType.Provider.value.name}</h1>
  }
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