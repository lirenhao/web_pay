/**
 * Created by cuita on 2016/5/1.
 */
import React from 'react';
import ProductList from './ItemList';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';

var OrderEventType = Const.OrderEventType;

var OrderInfo = React.createClass({
  getInitialState: function () {
    return {orderInfo: PaymentStore.getCurPaymentInfo().orderInfo || {}};
  },
  componentDidMount: function () {
    PaymentStore.addChangeListener(OrderEventType.ITEMS_CHANGED, this._onChange);
    PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  componentWillUnmount: function () {
    PaymentStore.removeChangeListener(OrderEventType.ITEMS_CHANGED, this._onChange);
    PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
  },
  _onChange: function () {
    this.setState({orderInfo: PaymentStore.getCurPaymentInfo().orderInfo});
  },
  render: function () {
    if (this.state.orderInfo) {
      return (
        <div>
          <h4><span className="label label-info"><span className="glyphicon glyphicon-pushpin"></span> {this.state.orderInfo.orderId}</span></h4>
          <div className="panel panel-info panel-sm">
            <div className="panel-heading">
              <label>订单信息</label>
            </div>
            <ProductList items={this.state.orderInfo.items || []}/>
          </div>
        </div>
      )
    }
    else
      return (<div  role="alert">正在加载订单信息...</div>);
  }
});

export default OrderInfo;