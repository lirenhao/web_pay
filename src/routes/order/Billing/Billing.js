/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import PaymentStore from '../../../stores/PaymentStore.js';
import Money from '../Money';
import Const from '../../../constants/PaymentConstants.js';
var OrderEventType = Const.OrderEventType;

var Billing = React.createClass({
  getInitialState: function() {
    return {
      orderInfo: PaymentStore.getCurPaymentInfo().orderInfo,
      marketing: PaymentStore.getCurPaymentInfo().marketing
    };
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.ITEMS_CHANGED, this._onChange);
    PaymentStore.addChangeListener(OrderEventType.MARKETING_CHANGED, this._onChange);
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.ITEMS_CHANGED, this._onChange);
    PaymentStore.removeChangeListener(OrderEventType.MARKETING_CHANGED, this._onChange);
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    this.setState({
      orderInfo: PaymentStore.getCurPaymentInfo().orderInfo,
      marketing: PaymentStore.getCurPaymentInfo().marketing
    });
  },
  render: function () {
    if (this.state.orderInfo && this.state.marketing) {
      let totalAmt = this.state.orderInfo.items.reduce((amt, curP) => amt + curP.price * curP.quantity, 0);
      return (
        <div>
          <h2>结算</h2>
          <table>
            <tbody>
            <tr>
              <td>总价</td>
              <td><Money>{totalAmt}</Money></td>
            </tr>
            <tr>
              <td>优惠</td>
              <td><Money>{-this.state.marketing.amt}</Money></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td>结算</td>
              <td><Money>{totalAmt - this.state.marketing.amt}</Money></td>
            </tr>
            </tfoot>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
});

export default Billing;