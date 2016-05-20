/**
 * Created by cuita on 2016/5/1.
 */
import Const from '../constants/PaymentConstants.js';
import PaymentDispatcher from '../dispatcher/PaymentDispatcher.js';
import Payment from '../Payment';
var EventType = Const.EventType;

class ActionCreator extends Payment {
  setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  errorHandle(err) {
    console.log(err);
  }

  msgHandle(msg) {
    PaymentDispatcher.dispatch(msg);
  }

  clientSignIn() {
    this.send({
      eventType: EventType.CLIENT_SIGN_IN,
      ...this.userProfile
    })
  }

  createOrder(orderInfo) {
    this.send({
      eventType: EventType.CREATE_ORDER,
      ...orderInfo
    });
  }

  joinOrder(orderId) {
    this.send({
      eventType: EventType.JOIN_ORDER,
      orderId: orderId
    })
  }

  reqPayAuth(orderId) {
    this.send({
      eventType: EventType.PAY_AUTH_REQ,
      orderId: orderId
    });
  }

  giveUpPay(orderId) {
    this.send({
      eventType: EventType.GIVE_UP_PAY,
      orderId: orderId
    });
  }

  cancelOrder(orderId) {
    this.send({
      eventType: EventType.CANCEL_ORDER,
      orderId: orderId
    })
  }

  payResult(result) {
    this.send({
      eventType: EventType.PAY_RESULT,
      ...result
    })
  }

  send(msg) {
    this.open();
    super.send({...msg, ...this.userProfile});
    PaymentDispatcher.dispatch(msg);
  }
}

export default new ActionCreator();