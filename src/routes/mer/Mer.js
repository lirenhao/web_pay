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
import history from '../../core/history';

function Mer(props, context) {
  context.setTitle("商户支付");

  return (
    <div>
      <OrderSelector />
      <OrderInfo />
      <MarketingInfo />
      <Billing />
      <PayButton canCancel={true} onReqPay={orderId => {
        Payment.reqPayAuth(orderId);
        // DialogActionCreator.show({title: "test title", message: "test message", btns: [
        // {
        //   name: "确定",
        //   onClick: () => DialogActionCreator.close()
        // }
        // ]})
      }} onPay={orderId => {
        history.push({
          pathname: '/payment',
          query: {orderId: orderId}
        });
      }} onCancel={orderId =>{
        Payment.cancelOrder(orderId);
        PaymentActionCreator.removeOrder(orderId);
      }} />
    </div>
  )
}

Mer.contextTypes = {setTitle: PropTypes.func.isRequired};
export default Mer;