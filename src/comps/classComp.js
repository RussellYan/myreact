import { Component } from '../component';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {number: 2};
  }
  click = async () => {
    this.setState({number: this.state.number + 1});
    console.log(11123);
  }
  render() {
    return (
      <div>
        <strong>{this.props.name}, {this.state.number}</strong>
        <button onClick={this.click}>plus</button>
      </div>
    )
  }
}

export default Welcome;