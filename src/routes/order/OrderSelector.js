/**
 * Created by cuita on 2016/5/22.
 */

import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore'
import Const from '../../constants/PaymentConstants.js';
import PaymentActionCreator from '../../actions/PaymentActionCreator';
import {Nav} from 'react-bootstrap';

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
    if (PaymentStore.getOrderIds().length == 0)
      this.props.onEmptyOrder();
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
      <li role="presentation" key={idInfo.orderId}>
        <a href="javascript:void(0)" onClick={this.handleClick.bind(null, idInfo.orderId)}>
          {idInfo.orderId}</a>
      </li>
    );
    return (
      <Nav bsStyle="tabs">
        {idComponents}
      </Nav>
    )
  }
});

OrderSelector.PropTypes = {
  onEmptyOrder: PropTypes.func.isRequired
};
export default OrderSelector;