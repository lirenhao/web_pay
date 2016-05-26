/**
 * Created by cuitao-pc on 16/5/26.
 */

import DialogDispatcher from '../dispatcher/DialogDispatcher';
import {DialogCmd, DialogEvent} from '../constants/DialogConstants';
import assign from 'object-assign';
import EventEmitter from 'events';

var _dialogQueue = [];

var DialogStore = assign({}, EventEmitter.prototype, {
  emitChange: function (eventType) {
    this.emit(eventType);
  },
  addChangeListener: function (eventType, callback) {
    this.on(eventType, callback);
  },
  removeChangeListener: function (eventType, callback) {
    this.removeListener(eventType, callback);
  },
  getDialogQueueRef: function () {
    return _dialogQueue;
  }
});

DialogStore.dispatchToken = DialogDispatcher.register(function (action) {
  var {eventType, msg} = action;
  var emitChange = DialogStore.emitChange.bind(DialogStore);

  switch (eventType) {
    case DialogCmd.OPEN:
      _dialogQueue.push(msg);
      emitChange(DialogEvent.SHOW_NEXT);
      break;
    case DialogCmd.CLOSE:
      emitChange(DialogEvent.SHOW_NEXT);
      break;
  }
});
export default DialogStore