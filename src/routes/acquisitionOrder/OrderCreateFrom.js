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
    this.state.items[index][name] = value;
    this.forceUpdate();
  },
  render: function () {
    var s2i = (v, defaultV, minLen, maxLen) => {
      var regex = new RegExp("^[0-9]{" + minLen + "," + maxLen + "}$");
      if (regex.test(v))
        return parseInt(v);
      else if (v == "")
        return "";
      else
        return defaultV;
    };
    var children = this.state.items.map((p, index) => (<OrderItem
      key={index} {...p}
      nameChange={e => this.handleChange(index, "name", e.target.value)}
      priceChange={e => this.handleChange(index, "price", s2i(e.target.value, this.state.items[index]["price"], 1, 6))}
      quantityChange={e => this.handleChange(index, "quantity", s2i(e.target.value, this.state.items[index]["quantity"], 1, 3))}
      deleteItem={() => {
        this.state.items.splice(index, 1);
        this.forceUpdate();
      }}
    />));
    var getOrdersBtn = () => {
      if (PaymentStore.getOrderIds().length != 0) {
        return <input type="button" value={"已有" + PaymentStore.getOrderIds().length + "个订单"}
                      onClick={e => this.props.onEntryOrder()}/>
      } else {
        return null;
      }
    };
    var getItems = () => {
      return this.state.items.filter((r) => r.name.trim() != "" && r.price != "" && r.price != 0 && r.quantity != "" && r.quantity != 0);
    };
    return (
      <div>
        {children}
        <div>
          <input type="button" value="添加"
                 onClick={() => this.setState({items: [...this.state.items, {name: "", price: "", quantity: ""}]})}/>
          <input type="button" value="提交" onClick={() => {
          let items = getItems();
          if(items.length > 0)
            this.props.createOrder(items)
          }} disabled={getItems().length == 0} />
          {getOrdersBtn()}
        </div>
      </div>
    )
  }
});

export default OrderCreateFrom;