/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import PaymentStore from '../../../stores/PaymentStore.js';
import Money from '../Money';
import Const from '../../../constants/PaymentConstants.js';
var OrderEventType = Const.OrderEventType;

var MarketingInfo = React.createClass({
  getInitialState: function() {
    return {marketing: PaymentStore.getCurPaymentInfo().marketing || {}};
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.MARKETING_CHANGED, this._onChange);
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.MARKETING_CHANGED, this._onChange);
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    this.setState({marketing: PaymentStore.getCurPaymentInfo().marketing});
  },
  render: function () {
    if (this.state.marketing) {
      return (
        <div>
          <h2>优惠信息</h2>
          <label>优惠金额:</label><Money>{this.state.marketing.amt}</Money>
          <br />
          <label>优惠信息:</label><span>{this.state.marketing.msg}</span>
        </div>
      );
    } else {
      return (<div>正在加载优惠信息....</div>);
    }
  }
});

export default MarketingInfo;