/**
 * Created by cuitao-pc on 16/5/26.
 */

import DialogDispatcher from '../dispatcher/DialogDispatcher';
import {DialogCmd} from '../constants/DialogConstants';
var DialogActionCreator = {
  show: (msg) => DialogDispatcher.dispatch({eventType: DialogCmd.SHOW, ...msg}),
  close: () => DialogDispatcher.dispatch({eventType: DialogCmd.CLOSE})
};
export {DialogActionCreator};
export default DialogActionCreator;