/**
 * Created by cuita on 2016/5/1.
 */

import React, {PropTypes, Component} from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import DialogStore from '../../stores/DialogStore';
import Dialog from '../Dialog';
import {DialogEvent} from '../../constants/DialogConstants'

class App extends Component {
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {dialogQueue: DialogStore.getDialogQueueRef()};
    this._onNext = this._onNext.bind(this);
  }

  componentWillMount() {
    DialogStore.addChangeListener(DialogEvent.SHOW_NEXT, this._onNext);
  }

  componentWillUnmount() {
    DialogStore.removeChangeListener(DialogEvent.SHOW_NEXT, this._onNext);
  }

  _onNext() {
    this.forceUpdate();
  }
  
  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction
    }
  }

  getDialog() {
    if(this.state.dialogQueue.length != 0)
      return <Dialog {...this.state.dialogQueue.shift()} />;
    else
      return null;
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.getDialog()}
      </div>
    );
  }
}

export default App;