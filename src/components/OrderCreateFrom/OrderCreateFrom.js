/**
 * Created by cuitao-pc on 16/5/19.
 */
import React from 'react'
import OrderItem from './OrderItem'
import {Payment} from '../../Payment'

var payment = new Payment();
var OrderCreateFrom = React.createClass({
  getInitialState: function () {
    // return {items: []}

    return {
      id: "0001",
      items: [
        {
          name: "袜子",
          price: 2900,
          quantity: 2
        },
        {
          name: "裤头",
          price: 3980,
          quantity: 1
        },
        {
          name: "卫生纸",
          price: 2690,
          quantity: 5
        }
      ]
    }
  },
  handleTerminalIdChange: function (event) {
    this.setState({id: event.target.value})
  }
  ,
  handleCreateOrder: function () {
    payment.createOrder({id: this.state.id, terminalType: "MERCHANT", products: this.state.items})
  },
  handleAddItem: function () {
    this.setState({items: [...this.state.items, {name: "", price: "", quantity: ""}]})
  },
  handleNameChange: function (index, event) {
    this.setState({items: this.state.items.map((v, i) => i == index ? {...v, name: event.target.value} : v)});
  },
  handlePriceChange: function (index, event) {
    this.setState({
      items: this.state.items.map((v, i) => i == index ? {
        ...v,
        price: parseInt(event.target.value, 10)
      } : v)
    });
  },
  handleQuantityChange: function (index, event) {
    this.setState({
      items: this.state.items.map((v, i) => i == index ? {
        ...v,
        quantity: parseInt(event.target.value, 10)
      } : v)
    });
  },
  handleDeleteItem: function (index) {
    this.setState({items: this.state.items.filter((v, i) => i != index)});
  },
  render: function () {
    var children = this.state.items.map((p, index) => (<OrderItem
      key={index} {...p}
      nameChange={this.handleNameChange.bind(null, index)}
      priceChange={this.handlePriceChange.bind(null, index)}
      quantityChange={this.handleQuantityChange.bind(null, index)}
      deleteItem={this.handleDeleteItem.bind(null, index)}
    />));
    return (
      <form>
        <input name="id" placeholder="终端号" onChange={this.handleTerminalIdChange} value={this.state.id}/>
        {children}
        <div>
          <input type="button" value="添加" onClick={this.handleAddItem}/>
          <input type="button" value="提交" onClick={this.handleCreateOrder}/>
        </div>
      </form>
    )
  }
});

export default OrderCreateFrom;