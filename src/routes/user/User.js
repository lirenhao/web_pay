/**
 * Created by cuitao-pc on 16/5/24.
 */
import React, {PropTypes} from 'react';
import OrderSelector from '../../components/OrderSelector/OrderSelector';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import MarketingInfo from '../../components/MarketingInfo/MarketingInfo';
import Billing from '../../components/Billing/Billing';
import PayButton from '../../components/PayButton/PayButton';
import Payment from '../../Payment';
import PaymentActionCreator from '../../actions/PaymentActionCreator';

function User(props, context) {
  context.setTitle("用户支付");

  return (
    <div>
      <OrderSelector />
      <OrderInfo />
      <MarketingInfo />
      <Billing />
      <PayButton canCancel={false} onReqPay={orderId => {
      Payment.reqPayAuth(orderId);
      }} onPay={orderId => {
        history.push({
          pathname: '/payment',
          query: {orderId: orderId}
        });
      }}/>
    </div>
  )
}

User.contextTypes = {setTitle: PropTypes.func.isRequired};
export default User;