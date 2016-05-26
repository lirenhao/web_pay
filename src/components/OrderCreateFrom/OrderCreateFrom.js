/**
 * Created by cuitao-pc on 16/5/19.
 */
import React, {PropTypes} from 'react';
import OrderItem from './OrderItem';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';

var OrderEventType = Const.OrderEventType;

var OrderCreateFrom = React.createClass({
  propTypes: {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })),
    createOrder: PropTypes.func.isRequired,
    onEntryOrder: PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {items: this.props.items} || {items: []};
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
  handleChange: function (index, name, value) {
    this.setState({items: this.state.items.map((v, i) => {
      var row = {...v};
      row[name] = value;
      return row;
    })})
  },
  render: function () {
    var children = this.state.items.map((p, index) => (<OrderItem
      key={index} {...p}
      nameChange={e => this.handleChange(index, "name", e.target.value)}
      priceChange={e => this.handleChange(index, "price", parseInt(e.target.value))}
      quantityChange={e => this.handleChange(index, "quantity", parseInt(e.target.value))}
      deleteItem={() => this.setState({items: this.state.items.filter((v, i) => i != index)})}
    />));
    var getOrdersBtn = () => {
      if(PaymentStore.getOrderIds().length != 0) {
        return <input type="button" value={"已有" + PaymentStore.getOrderIds().length + "个订单"} onClick={e => this.props.onEntryOrder()} />
      } else {
        return null;
      }
    };
    return (
      <div>
        {children}
        <div>
          <input type="button" value="添加" onClick={() => this.setState({items: [...this.state.items, {name: "", price: "", quantity: ""}]})}/>
          <input type="button" value="提交" onClick={() => this.props.createOrder([...this.state.items])}/>
          {getOrdersBtn()}
        </div>
      </div>
    )
  }
});

export default OrderCreateFrom;