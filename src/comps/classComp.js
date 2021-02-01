import { Component } from '../component';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {number: 0, type: 'clcik'};
  }
  clickA = () => {
    console.log('点击buttonA');
  }
  clickB = () => {
    console.log('点击buttonB');
  }
  clickDiv = () => {
    console.log('点击div');
  }
  render() {
    return (
      <div onClick={this.clickDiv}>
        <strong>{this.props.name}, {this.state.number}</strong>
        <br/>
        <button onClick={this.clickA}>A</button>
        <br/>
        <button onClick={this.clickB}>B</button>
      </div>
    )
  }
}

export default Welcome;