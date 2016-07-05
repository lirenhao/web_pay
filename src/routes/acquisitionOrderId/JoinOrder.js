/**
 * Created by cuitao-pc on 16/5/19.
 */

import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore';
import Const from '../../constants/PaymentConstants.js';
import {Form,InputGroup, Glyphicon, Button} from 'react-bootstrap';

var OrderEventType = Const.OrderEventType;

var JoinOrder = React.createClass({
  propTypes: {
    joinOrder: PropTypes.func.isRequired,
    onEntryOrder: PropTypes.func
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
  render: function () {
    let hidden = PaymentStore.getOrderIds().length != 0 ? "" : "hidden";

    return (
      <Form inline>
        <InputGroup>
          <InputGroup.Addon>
            <Glyphicon glyph="qrcode"/>
          </InputGroup.Addon>
          <label className="sr-only" htmlFor="orderID">订单号</label>
          <input id="orderID" className="form-control"
                 ref={c => this.orderIdInput = c} placeholder="订单ID"/>
          <InputGroup.Button>
            <Button bsStyle="success" onClick={() => this.props.joinOrder(this.orderIdInput.value)}>
              加入</Button>
          </InputGroup.Button>
        </InputGroup>
        <p/>
        <Button bsStyle="info" className={hidden} onClick={e => this.props.onEntryOrder()}>
          <span className="badge">{PaymentStore.getOrderIds().length}</span>
          &nbsp;个待支付</Button>
      </Form>
    );
  }
});

export default JoinOrder;