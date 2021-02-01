import React from '../react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: 0, type: 'clcik'};
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
  }
  add = () => {
    // console.log('点击Enter');
    const a = +this.a.current.value;
    const b = +this.b.current.value;
    this.result.current.value = parseFloat(a + b);
  }
  clickDiv = () => {
    // console.log('点击div');
  }
  render() {
    return (
      <div onClick={this.clickDiv}>
        <input ref={this.a} /> + <input ref={this.b}/> 
        <br/>
        <button onClick={this.add}>Enter</button>
        <br/>
        =
        <input ref={this.result} />
      </div>
    )
  }
}

export default Welcome;