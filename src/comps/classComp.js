import React from '../react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      type: 'clcik',
      a: 0,
      b: 0
    };
    this.a = React.createRef();
    this.b = React.createRef();
    console.log('父组件1. set up props and state');
  }
  componentWillMount() {
    console.log('父组件2. componentWillMount');
  }
  componentDidMount() {
    console.log('父组件4. componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('父组件5. shouldComponentUpdate');
    console.log(nextState.number % 2 === 0);
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('父组件6. componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('父组件6. componentDidUpdate');
  }
  add = () => {
    // console.log('点击Enter');
    const a = +this.a.current.value || 0;
    const b = +this.b.current.value || 0;
    const number = parseFloat(a + b);
    console.log(number);
    this.setState({ number, a, b });
  }
  clickDiv = () => {
    // console.log('点击div');
    // this.setState(nextState => nextState.number++);
  }
  render() {
    console.log('父组件3. render');
    const { number, a, b } = this.state;
    const show = number && (number % 2 === 0);
    return (
      <div onClick={this.clickDiv}>
        <input ref={this.a} type='number' value={a} /> + <input ref={this.b} type='number' value={b}/> 
        <br/>
        <button onClick={this.add}>Enter</button>
        <br/>
        =
        <input type='number' value={number}/>
        <br />
        <span>{number}</span>
        <br />
        {!!show && <MyWel number={number}/>}
      </div>
    )
  }
}

class MyWel extends React.Component {
  componentWillMount() {
    console.log('子组件 1. componentWillMount');
  }
  render() {
    console.log('子组件 2. render');
    return(
      <div>现在是偶数: {this.props.number}</div>
    )
  }
  componentDidMount() {
    console.log('子组件 3. componentDidMount');
  }
  componentWillUpdate() {
    console.log('子组件 4. componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('子组件 5. componentDidUpdate');
  }
  componentWillReceiveProps() {
    console.log('子组件 6. componentWillReceiveProps');
  }
  componentWillUnmount() {
    console.log('子组件 7. componentWillUnmount');
  }
}

export default Welcome;