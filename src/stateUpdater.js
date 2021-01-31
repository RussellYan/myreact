// 模拟 setState
class Updater {
  constructor() {
    this.state = {name: 'state', number: 0};
    this.queue = [];
  }
  setState(newState) {
    this.queue.push(newState);
    // console.log('new state: ', newState, this.queue);
  }
  flush() {
    for (let i = 0; i < this.queue.length; i++) {
      let update = this.queue[i];
      if (typeof update === 'function') {
        console.log(i, update, this.state);
        this.state = { ...this.state, ...update(this.state) };
      } else {
        this.state = { ...this.state, ...update };
      }
    }
  }
}

let updater = new Updater();
updater.setState({ number: 1 });
updater.setState(previousState => ({
  number: previousState.number + 1
}));
updater.setState({ number: 2 });
updater.setState({ name: 'setState', number: 3 });
updater.flush();
console.log(updater.state);