/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Money from '../Money';
import Const from '../../constants/PaymentConstants.js';
var EventType = Const.EventType;

var Billing = React.createClass({
  getInitialState: function() {
    return {
      orderInfo: PaymentStore.getPaymentInfo().orderInfo,
      marketing: PaymentStore.getPaymentInfo().marketing
    };
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(EventType.ORDER_ITEMS, this._onChange);
    PaymentStore.addChangeListener(EventType.MARKETING, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(EventType.ORDER_ITEMS, this._onChange);
    PaymentStore.removeChangeListener(EventType.MARKETING, this._onChange);
  },
  _onChange: function () {
    this.setState({
      orderInfo: PaymentStore.getPaymentInfo().orderInfo,
      marketing: PaymentStore.getPaymentInfo().marketing
    });
  },
  render: function () {
    if (this.state.orderInfo && this.state.marketing) {
      let totalAmt = this.state.orderInfo.products.reduce((amt, curP) => amt + curP.price * curP.quantity, 0);
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