/**
 * Created by cuitao-pc on 16/5/19.
 */

import React from 'react';
import Payment from '../../Payment'
var JoinOrder = React.createClass({
  getInitialState: function () {
    return {orderId: ""};
  },
  handleOrderIdChange: function (event) {
    this.setState({orderId: event.target.value});
  },
  handleJoin: function () {
    Payment.joinOrder(this.state.orderId);
  },
  render: function () {
    return (
      <div>
        <input defaultValue={this.state.orderId} onChange={this.handleOrderIdChange} placeholder="订单ID" />
        <input type="button" value="加入" onClick={this.handleJoin} />
      </div>
    );
  }
});

export default JoinOrder;