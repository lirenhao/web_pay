/**
 * Created by cuita on 2016/5/1.
 */

import PaymentDispatcher from '../dispatcher/PaymentDispatcher.js';
import Const from '../constants/PaymentConstants.js';
import EventEmitter from 'events';
import assign from 'object-assign';
var EventType = Const.EventType;
var LocalStatus = Const.LocalStatus;

var paymentInfo = {};
var payStatus = LocalStatus.UNREADY;

var PaymentStore = assign({}, EventEmitter.prototype, {
  emitChange: function(eventType) {
    this.emit(eventType);
  },
  addChangeListener: function(eventType, callback) {
    this.on(eventType, callback);
  },
  removeChangeListener: function(eventType, callback) {
    this.removeListener(eventType, callback);
  },
  getPaymentInfo: function () {
    return paymentInfo;
  },
  getPayStatus: function () {
    return payStatus;
  }
});

PaymentStore.dispatchToken = PaymentDispatcher.register(function (action) {
  var {eventType, ...msg} = action;

  switch (eventType) {
    case EventType.ORDER_ITEMS:
      paymentInfo.orderInfo = msg;
      PaymentStore.emitChange(eventType);
      break;
    case EventType.MARKETING:
      paymentInfo.marketing = msg;
      PaymentStore.emitChange(eventType);
      if(payStatus != LocalStatus.READY) {
        payStatus = LocalStatus.READY;
        PaymentStore.emitChange(EventType.STATUS_CHANGE);
      }
      break;
    case EventType.PAY_COMPLETED:
      paymentInfo.payResult = msg;
      PaymentStore.emitChange(eventType);
      if(payStatus != LocalStatus.PAY_COMPLETED) {
        payStatus = LocalStatus.PAY_COMPLETED;
        PaymentStore.emitChange(EventType.STATUS_CHANGE);
      }
      break;
    case EventType.PAY_AUTH:
      PaymentStore.emitChange(eventType);
      if(payStatus != LocalStatus.UNREADY) {
        payStatus = LocalStatus.UNREADY;
        PaymentStore.emitChange(EventType.STATUS_CHANGE);
      }
      break;
    case EventType.PAY_AUTH_REQ:
      if(payStatus != LocalStatus.WAIT_PAY_AUTH) {
        payStatus = LocalStatus.WAIT_PAY_AUTH;
        PaymentStore.emitChange(EventType.STATUS_CHANGE);
      }
      break;
    default:
      break;
  }
});
export default PaymentStore;