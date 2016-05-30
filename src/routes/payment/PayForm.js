/**
 * Created by cuitao-pc on 16/5/27.
 */

import React, {PropTypes} from 'react';

var PayForm = function (props, context) {
  context.setTitle("支付");
  var {orderInfo, onPayCompleted, onCancel} = props;
  var getOrderInfoComponent = (orderInfo) => {
    return (
      <div>
        <h1>{orderInfo.orderId}</h1>
        <h2>{orderInfo.orderAmt}</h2>
        {getOrderItemComponents(orderInfo.items)}
      </div>
    );
  };
  var getOrderItemComponents = (items) => {
    return (
      <ol>
        {items.map(({name, price, quantity}, i) =>
          <li key={i}>{name}
            <ul>
              <li>{price}</li>
              <li>{quantity}</li>
            </ul>
          </li>
        )}
      </ol>
    );
  };
  var selector;
  return (
    <div>
      {getOrderInfoComponent(orderInfo)}
      <select ref={c => selector = c}>
        <option value="0">成功</option>
        <option value="1">失败</option>
      </select>
      <input value="确定" type="button" onClick={e => onPayCompleted(selector.value)} />
      <input value="取消支付" type="button" onClick={onCancel} />
    </div>
  );
};

PayForm.propTypes = {
  orderInfo: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    orderAmt: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }))
  }),
  onPayCompleted: PropTypes.func.isRequired
};
PayForm.contextTypes = {
  setTitle: PropTypes.func.isRequired
};
export default PayForm;