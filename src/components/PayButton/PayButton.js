/**
 * Created by cuita on 2016/5/1.
 */
import React from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Payment from '../../Payment';
import Const from '../../constants/PaymentConstants.js';
import ActionCreator from '../../actions/ActionCreator';

var LocalStatus = Const.LocalStatus;
var OrderEventType = Const.OrderEventType;

var PayButton = React.createClass({
  getInitialState: function() {
    return {
      payStatus: PaymentStore.getPayStatus()
    };
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    this.setState({
      payStatus: PaymentStore.getPayStatus()
    });
  },
  handleTabClick: function () {
    Payment.reqPayAuth(PaymentStore.getPaymentInfo().orderInfo.orderId);
    ActionCreator.paying(PaymentStore.getCurrentOrderId());
  },
  handleDeleteClick: function () {
    ActionCreator.removeOrder(Payment.getCurrentOrderId());
  },
  render: function () {
    switch (this.state.payStatus) {
      case LocalStatus.READY:
        return (<input type="button" onClick={this.handleTabClick} value="支付" />);
      case LocalStatus.WAIT_PAY_AUTH:
        return (<input type="button" value="支付" disabled="disabled"/>);
      default:
        return null;
    }
  }
});

export default PayButton;