/**
 * Created by cuitao-pc on 16/5/19.
 */

import React from 'react';
import ActionCreator from '../../actions/ActionCreator'
var JoinOrder = React.createClass({
  getInitialState: function () {
    return {orderId: ""};
  },
  handleOrderIdChange: function (event) {
    this.setState({orderId: event.target.value});
  },
  handleJoin: function () {
    ActionCreator.joinOrder(this.state.orderId);
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