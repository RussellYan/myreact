import React from 'react';
import ReduxContext from './context';
import bindActionCreators from '../redux/bindActionCreators';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return WrapperComp => {
    return class extends React.Component {
      static contextType = ReduxContext;
      constructor(props, context) {
        super(props);
        this.state = mapStateToProps(context.store.getState());
      }
      componentDidMount() {
        this.unSubscribe = this.context.store.subscribe(() => {
          const stateMap = mapStateToProps(this.context.store.getState());
          this.setState(stateMap);
        });
      }
      componentWillUnmount() {
        this.unSubscribe();
      }
      render() {
        let actions = {};
        const {dispatch} = this.contextType.store;
        if (typeof mapDispatchToProps === 'function') {
          actions = mapDispatchToProps(dispatch);
        } else {
          actions = bindActionCreators(mapDispatchToProps, dispatch);
        }
        return <WrapperComp {...this.state} {...actions} />
      }
    }
  }
}

export default connect;