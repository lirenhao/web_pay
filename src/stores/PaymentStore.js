/**
 * Created by cuita on 2016/5/1.
 */

import PaymentDispatcher from '../dispatcher/PaymentDispatcher';
import Const from '../constants/PaymentConstants';
import EventEmitter from 'events';
import assign from 'object-assign';

var ClientCmd = Const.ClientCmd;
var OrderEventType = Const.OrderEventType;
var LocalStatus = Const.LocalStatus;

var _currentOrderId = null;
var _orders = {};

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
  getCurPaymentInfo: function () {
    return _orders[_currentOrderId] == undefined ? {} : _orders[_currentOrderId];
  },
  getPaymentInfo: function (orderId) {
    return _orders[orderId];
  },
  getPayStatus: function () {
    return _orders[_currentOrderId] == undefined ? LocalStatus.UNREADY : _orders[_currentOrderId].payStatus;
  },
  getOrderIds: function () {
    var ids = [];
    var i = 0;
    for (var id in _orders) {
      if (_orders.hasOwnProperty(id)) {
        ids[i] = {orderId: id, isCurrent: id == _currentOrderId};
        i++;
      }
    }
    return ids;
  },
  getCurrentOrderId: function () {
    return _currentOrderId;
  }
});

PaymentStore.dispatchToken = PaymentDispatcher.register(function (action) {
  var {eventType, ...msg} = action;

  var emitChange = PaymentStore.emitChange.bind(PaymentStore);

  switch (eventType) {
    case ClientCmd.ORDER_ITEMS:
      if (!_currentOrderId) {
        _currentOrderId = msg.orderId;
      }
      _orders[msg.orderId] = {orderInfo: msg, payStatus: LocalStatus.UNREADY};
      emitChange(OrderEventType.ORDER_CHANGED);
      emitChange(OrderEventType.ITEMS_CHANGED);
      break;
    case ClientCmd.MARKETING:
      if (!_orders[msg.orderId]) break;
      _orders[msg.orderId].marketing = msg;
      emitChange(OrderEventType.MARKETING_CHANGED);
      _orders[msg.orderId].payStatus = LocalStatus.READY;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_COMPLETED:
      if (!_orders[msg.orderId]) break;
      console.log(_currentOrderId);
      _orders[_currentOrderId].payResult = msg;
      emitChange(OrderEventType.ORDER_COMPLETED);
      _orders[msg.orderId].payStatus = LocalStatus.PAY_COMPLETED;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_AUTH:
      if(!_orders[msg.orderId]) break;
      _orders[msg.orderId].payStatus = LocalStatus.PAY_AUTH;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAYING:
      _orders[msg.orderId].payStatus = LocalStatus.WAIT_PAY_AUTH;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.REMOVE_COMPLETED_ORDER:
      if(!_orders[msg.orderId]) break;
        delete _orders[msg.orderId];
        var keys = Object.keys(_orders);
        if (keys.length == 0)
          _currentOrderId = undefined;
        else
          _currentOrderId = keys[0];
        emitChange(OrderEventType.ORDER_CHANGED);
      break;
    case ClientCmd.SELECT_ORDER:
      _currentOrderId = msg.orderId;
      emitChange(OrderEventType.ORDER_CHANGED);
      break;
    case ClientCmd.CANCEL_PAY:
      _orders[msg.orderId].payStatus = LocalStatus.READY;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    default:
      break;
  }
});
export default PaymentStore;