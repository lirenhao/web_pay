/**
 * Created by cuita on 2016/5/1.
 */
import React from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Payment from '../../Payment';
import Const from '../../constants/PaymentConstants.js';
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
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
  },
  _onChange: function () {
    console.log(JSON.stringify(PaymentStore.getPayStatus()));
    this.setState({
      payStatus: PaymentStore.getPayStatus()
    });
  },
  clickHandle: function () {
    Payment.reqPayAuth(PaymentStore.getPaymentInfo().orderInfo.orderId);
  },
  render: function () {
    switch (this.state.payStatus) {
      case LocalStatus.READY:
        return (<input type="button" onClick={this.clickHandle} value="支付" />);
      case LocalStatus.WAIT_PAY_AUTH:
        return (<input type="button" value="支付" disabled="disabled"/>);
      default:
        return null;
    }
  }
});

export default PayButton;