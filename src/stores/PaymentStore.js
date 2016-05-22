/**
 * Created by cuita on 2016/5/1.
 */

import PaymentDispatcher from '../dispatcher/PaymentDispatcher.js';
import Const from '../constants/PaymentConstants.js';
import EventEmitter from 'events';
import assign from 'object-assign';
var ClientCmd = Const.ClientCmd;
var OrderEventType = Const.OrderEventType;
var LocalStatus = Const.LocalStatus;

var _currentOrder = null;
var _orders = {};
// var paymentInfo = {};
var payStatus = LocalStatus.UNREADY;

var PaymentStore = assign({}, EventEmitter.prototype, {
  emitChange: function (eventType) {
    this.emit(eventType);
  },
  addChangeListener: function (eventType, callback) {
    this.on(eventType, callback);
  },
  removeChangeListener: function (eventType, callback) {
    this.removeListener(eventType, callback);
  },
  getPaymentInfo: function () {
    return _orders[_currentOrder] == undefined ? {} : _orders[_currentOrder];
  },
  getPayStatus: function () {
    return payStatus;
  },
  getOrderIds: function () {
    var ids = [];
    var i = 0;
    for(var id in _orders) {
      ids[i] = {orderId: id, isCurrent: id == _currentOrder};
      i++;
    }
    return ids;
  }
});

PaymentStore.dispatchToken = PaymentDispatcher.register(function (action) {
  var {eventType, ...msg} = action;

  if (!_currentOrder && msg.orderId) {
    _currentOrder = msg.orderId;
  }

  switch (eventType) {
    case ClientCmd.ORDER_ITEMS:
      if(!_orders[msg.orderId]) {
        _orders[msg.orderId] = {orderInfo: msg};
        PaymentStore.emitChange(OrderEventType.ORDER_CHANGED);
      }
      PaymentStore.emitChange(OrderEventType.ITEMS_CHANGED);
      break;
    case ClientCmd.MARKETING:
      _orders[_currentOrder].marketing = msg;
      PaymentStore.emitChange(OrderEventType.MARKETING_CHANGED);
      payStatus = LocalStatus.READY;
      PaymentStore.emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_COMPLETED:
      _orders[_currentOrder].payResult = msg;
      PaymentStore.emitChange(OrderEventType.ORDER_COMPLETED);
      payStatus = LocalStatus.PAY_COMPLETED;
      PaymentStore.emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_AUTH:
      payStatus = LocalStatus.UNREADY;
      PaymentStore.emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAYING:
      payStatus = LocalStatus.WAIT_PAY_AUTH;
      PaymentStore.emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.REMOVE_COMPLETED_ORDER:
      delete _orders[msg.orderId];
      PaymentStore.emitChange(OrderEventType.ORDER_CHANGED);
      break;
    case ClientCmd.SELECT_ORDER:
      if(msg.orderId != _currentOrder) {
        _currentOrder = msg.orderId;
        PaymentStore.emitChange(OrderEventType.ORDER_CHANGED);
      }
      break;
    default:
      break;
  }
});
export default PaymentStore;