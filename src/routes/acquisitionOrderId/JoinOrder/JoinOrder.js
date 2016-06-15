/**
 * Created by cuitao-pc on 16/5/19.
 */

import React, {PropTypes} from 'react';
import PaymentStore from '../../../stores/PaymentStore';
import Const from '../../../constants/PaymentConstants.js';

var OrderEventType = Const.OrderEventType;

var JoinOrder = React.createClass({
  propTypes: {
    joinOrder: PropTypes.func.isRequired,
    onEntryOrder: PropTypes.func
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    this.forceUpdate();
  },
  render: function () {
    var getOrdersBtn = () => {
      if(PaymentStore.getOrderIds().length != 0) {
        return <input type="button" value={"已有" + PaymentStore.getOrderIds().length + "个订单"} onClick={e => this.props.onEntryOrder()} />
      } else {
        return null;
      }
    };
    return (
      <div>
        <input ref={c => this.orderIdInput = c} placeholder="订单ID" />
        <input type="button" value="加入" onClick={() => this.props.joinOrder(this.orderIdInput.value)} />
        {getOrdersBtn()}
      </div>
    );
  }
});

export default JoinOrder;