/**
 * Created by cuita on 2016/5/1.
 */
import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import PaymentActionCreator from '../../actions/PaymentActionCreator';


var LocalStatus = Const.LocalStatus;
var OrderEventType = Const.OrderEventType;

var PayButton = React.createClass({
  propTypes: {
    onPay: PropTypes.func.isRequired,
    onReqPay: PropTypes.func.isRequired,
    canCancel: PropTypes.bool.isRequired,
    onCancel: PropTypes.func
  },
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
    var payState = PaymentStore.getPayStatus();
    this.setState({
      payStatus: PaymentStore.getPayStatus()
    });
    if(payState == LocalStatus.PAY_AUTH) {
      this.props.onPay(PaymentStore.getCurrentOrderId());
    }
  },
  render: function () {
    var getPayBtn = () => {
      switch (this.state.payStatus) {
        case LocalStatus.READY:
          return (<input type="button" onClick={() => {
          var orderId = PaymentStore.getCurrentOrderId();
          PaymentActionCreator.paying(orderId);
          this.props.onReqPay(orderId);
          }} value="支付"/>);
        case LocalStatus.WAIT_PAY_AUTH:
          return (<input type="button" value="支付" disabled="disabled"/>);
        default:
          return null;
      }
    };
    var getCancelBtn = () => {
      if(this.props.canCancel && PaymentStore.getCurrentOrderId() != undefined)
        return (<input type="button" onClick={() => {
        this.props.onCancel(PaymentStore.getCurrentOrderId());
        PaymentActionCreator.removeOrder(PaymentStore.getCurrentOrderId());
        }} value="取消" />);
      else
        return null;
    };

    return (
      <div>
        {getPayBtn()}
        {getCancelBtn()}
      </div>
    );
  }
});

export default PayButton;