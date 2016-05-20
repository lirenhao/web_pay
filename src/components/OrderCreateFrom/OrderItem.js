/**
 * Created by cuitao-pc on 16/5/19.
 */
import React from 'react'

var OrderItem = React.createClass({
  render: function () {
    return (
      <div>
        <input name="products.name" defaultValue={this.props.name} onChange={this.props.nameChange} placeholder="产品名称" />
        <input name="products.price" defaultValue={this.props.price} onChange={this.props.priceChange} placeholder="单价" />
        <input name="products.quantity" defaultValue={this.props.quantity} onChange={this.props.quantityChange} placeholder="数量" />
        <input type="button" onClick={this.props.deleteItem} value="删除"/>
      </div>
    )
  }
});

export default OrderItem;