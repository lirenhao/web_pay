/**
 * Created by cuita on 2016/5/22.
 */

import React from 'react';
import PaymentStore from '../../stores/PaymentStore'
import Const from '../../constants/PaymentConstants.js';
import PaymentActionCreator from '../../actions/PaymentActionCreator';

var OrderEventType = Const.OrderEventType;

var OrderSelector = React.createClass({
  getInitialState: function () {
    return {ids: PaymentStore.getOrderIds()};
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    return this.setState({ids: PaymentStore.getOrderIds()});
  },
  handleClick: function (orderId) {
    PaymentActionCreator.selectOrder(orderId);
  },
  handleDeleteClick: function () {
    PaymentActionCreator.removeOrder(PaymentStore.getCurrentOrderId());
  },
  render: function () {
    var idComponents = this.state.ids.map(idInfo =>
      <a href="javascript:void(0)" onClick={this.handleClick.bind(null, idInfo.orderId)} key={idInfo.orderId}>
        {idInfo.orderId}
      </a>
    );
    return (
      <div>
        {idComponents}
      </div>
    )
  }
});

export default OrderSelector;