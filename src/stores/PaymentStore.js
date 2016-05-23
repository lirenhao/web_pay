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
  emitChange: function (orderId, eventType) {
    this.emit(eventType);
  },
  addChangeListener: function (eventType, callback) {
    this.on(eventType, callback);
  },
  removeChangeListener: function (eventType, callback) {
    this.removeListener(eventType, callback);
  },
  getPaymentInfo: function () {
    return _orders[_currentOrderId] == undefined ? {} : _orders[_currentOrderId];
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

  if (!_currentOrderId && msg.orderId) {
    _currentOrderId = msg.orderId;
  }

  var emitChange = PaymentStore.emitChange.bind(PaymentStore, msg.orderId);

  switch (eventType) {
    case ClientCmd.ORDER_ITEMS:
      if (!_orders[msg.orderId]) {
        _orders[msg.orderId] = {orderInfo: msg, payStatus: LocalStatus.UNREADY};
        emitChange(OrderEventType.ORDER_CHANGED);
      }
      emitChange(OrderEventType.ITEMS_CHANGED);
      break;
    case ClientCmd.MARKETING:
      _orders[msg.orderId].marketing = msg;
      emitChange(OrderEventType.MARKETING_CHANGED);
      _orders[msg.orderId].payStatus = LocalStatus.READY;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_COMPLETED:
      _orders[_currentOrderId].payResult = msg;
      emitChange(OrderEventType.ORDER_COMPLETED);
      _orders[msg.orderId].payStatus = LocalStatus.PAY_COMPLETED;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAY_AUTH:
      _orders[msg.orderId].payStatus = LocalStatus.UNREADY;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.PAYING:
      _orders[msg.orderId].payStatus = LocalStatus.WAIT_PAY_AUTH;
      emitChange(OrderEventType.STATUS_CHANGED);
      break;
    case ClientCmd.REMOVE_COMPLETED_ORDER:
      delete _orders[msg.orderId];
      emitChange(OrderEventType.ORDER_CHANGED);
      break;
    case ClientCmd.SELECT_ORDER:
      _currentOrderId = msg.orderId;
      emitChange(OrderEventType.ORDER_CHANGED);
      break;
    default:
      break;
  }
});
export default PaymentStore;