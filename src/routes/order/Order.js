/**
 * Created by cuitao-pc on 16/5/24.
 */
import React, {PropTypes} from 'react';
import OrderSelector from './OrderSelector/OrderSelector';
import OrderInfo from './OrderInfo/OrderInfo';
import MarketingInfo from './MarketingInfo/MarketingInfo';
import Billing from '../../routes/order/Billing/Billing';
import PayButton from './PayButton/PayButton';
import Payment from '../../Payment';
import history from '../../core/history';

function Order(props, context) {
  context.setTitle("订单");

  return (
    <div>
      <OrderSelector onEmptyOrder={ () => {
      if(props.isMerchant)
        history.push("/acqOrder");
      else
        history.push("/acqOrderId");
      }}/>
      <OrderInfo />
      <MarketingInfo />
      <Billing />
      <PayButton canCancel={props.isMerchant} onReqPay={orderId => {
        Payment.reqPayAuth(orderId);
      }} onPay={orderId => {
        history.push({
          pathname: '/payment',
          query: {orderId: orderId}
        });
      }} onCancel={orderId => {
        Payment.cancelOrder(orderId);
      }}/>
    </div>
  )
}
Order.propTypes = {isMerchant: PropTypes.bool.isRequired};
Order.contextTypes = {setTitle: PropTypes.func.isRequired};
export default Order;