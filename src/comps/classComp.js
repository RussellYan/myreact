import React from '../react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: 0, type: 'clcik'};
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
    console.log('Counter1. set up props and state');
  }
  componentWillMount() {
    console.log('Counter2. componentWillMount');
  }
  componentDidMount() {
    console.log('Counter4. componentDidMount');
  }
  shouldComponnentUpdate(nextProps, nextState) {
    console.log('Counter5. componentDidMount');
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log('Counter6. componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('Counter6. componentDidUpdate');
  }
  add = () => {
    // console.log('点击Enter');
    const a = +this.a.current.value;
    const b = +this.b.current.value;
    this.result.current.value = parseFloat(a + b);
  }
  clickDiv = () => {
    // console.log('点击div');
    this.setState(nextState => nextState.number++);
  }
  render() {
    console.log('Counter3. render');
    return (
      <div onClick={this.clickDiv}>
        <input ref={this.a} /> + <input ref={this.b}/> 
        <br/>
        <button onClick={this.add}>Enter</button>
        <br/>
        =
        <input ref={this.result} />
        <br />
        <span>{this.state.number}</span>
      </div>
    )
  }
}

export default Welcome;