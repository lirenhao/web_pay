/**
 * Created by cuita on 2016/5/1.
 */
import Const from '../constants/PaymentConstants.js';
import PaymentDispatcher from '../dispatcher/PaymentDispatcher.js';
var ClientCmd = Const.ClientCmd;

class PaymentActionCreator {
  static serverAction(msg) {
    PaymentDispatcher.dispatch(msg);
  }

  static selectOrder(orderId) {
    PaymentDispatcher.dispatch({eventType: ClientCmd.SELECT_ORDER, orderId: orderId});
  }

  static paying(orderId) {
    PaymentDispatcher.dispatch({eventType: ClientCmd.PAYING, orderId: orderId});
  }

  static cancelPay(orderId) {
    PaymentDispatcher.dispatch({eventType: ClientCmd.CANCEL_PAY, orderId: orderId});
  }
  static removeOrder(orderId) {
    PaymentDispatcher.dispatch({eventType: ClientCmd.REMOVE_COMPLETED_ORDER, orderId: orderId});
  }
}

export default PaymentActionCreator;