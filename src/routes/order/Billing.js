/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Money from './Money';
import Const from '../../constants/PaymentConstants.js';
import {Table,Glyphicon} from 'react-bootstrap';
import './Order.scss';
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
          <div className="panel panel-info">
            <div className="panel-heading"><Glyphicon glyph="yen" aria-hidden="true"/>
              &nbsp;结算</div>
              <Table condensed>
                <tbody>
                <tr>
                  <td className={s.padin}>总价</td>
                  <td className={s.textRed+" text-right " +s.padin}><Money>{totalAmt}</Money>&nbsp; &nbsp;</td>
                </tr>
                <tr>
                  <td className={s.padin}>优惠</td>
                  <td className={s.textRed+" text-right " +s.padin}>
                    <Money>{-this.state.marketing.amt}</Money>&nbsp; &nbsp;</td>
                </tr>
                <tr>
                  <td className={s.padin}>结算</td>
                  <td className={s.textRed+" text-right " +s.padin}>
                    <Money>{totalAmt - this.state.marketing.amt}</Money>&nbsp; &nbsp;</td>
                </tr>
                </tbody>
              </Table>
          </div>
      );
    } else {
      return null;
    }
  }
});

export default Billing ;