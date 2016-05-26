/**
 * Created by cuitao-pc on 16/5/19.
 */

import React, {PropTypes} from 'react';

var JoinOrder = React.createClass({
  propTypes: {
    joinOrder: PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div>
        <input ref={c => this.orderIdInput = c} placeholder="订单ID" />
        <input type="button" value="加入" onClick={() => this.props.joinOrder(this.orderIdInput.value)} />
      </div>
    );
  }
});

export default JoinOrder;