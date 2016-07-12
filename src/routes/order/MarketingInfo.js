/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Money from './Money';
import Const from '../../constants/PaymentConstants.js';
import s from './Order.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Table,Glyphicon} from 'react-bootstrap';
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
        <div className="panel panel-info">
          <div className="panel-heading"><Glyphicon glyph="tag" aria-hidden="true"> </Glyphicon>
            &nbsp;优惠信息</div>
          <Table className={s.fcolor} condensed>
            <tbody>
            <tr>
              <td className={s.padin}>优惠金额</td>
              <td className={"text-right " +s.padin}><Money>{this.state.marketing.amt}</Money>&nbsp; &nbsp;</td>
            </tr>
            <tr>
              <td className={s.padin}>优惠信息</td>
              <td className={"text-right " +s.padin}><span>{this.state.marketing.msg}</span>&nbsp; &nbsp;</td>
            </tr>
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (<div role="alert">正在加载优惠信息....</div>);
    }
  }
});

export default withStyles(s)(MarketingInfo);