/**
 * Created by cuita on 2016/5/1.
 */
import React from 'react';
import ProductList from './ProductList';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';

var EventType = Const.EventType;

var OrderInfo = React.createClass({
  getInitialState: function () {
    return PaymentStore.getPaymentInfo().orderInfo || {};
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(EventType.ORDER_ITEMS, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(EventType.ORDER_ITEMS, this._onChange);
  },
  _onChange: function () {
    this.setState({orderInfo: PaymentStore.getPaymentInfo().orderInfo});
  },
  render: function () {
    if (this.state.orderInfo) {
      return (
        <div>
          <h1>{this.state.orderInfo.orderId}</h1>
          <h2>订单信息</h2>
          <ProductList products={this.state.orderInfo.products}/>
        </div>
      )
    } else {
      return (<div>正在加载订单信息...</div>)
    }
  }
});

export default OrderInfo;