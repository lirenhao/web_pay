/**
 * Created by cuitao-pc on 16/5/27.
 */
import React from 'react';
import PayForm from './PayForm';
import PaymentStore from '../../stores/PaymentStore';
import Payment from '../../Payment/Payment';
import history from '../../core/history';
import PaymentActiveCreator from '../../actions/PaymentActionCreator';

export default {
  path: "/payment",

  async action({query}) {
    var redirect = () => {
      if(Payment.userProfile.terminalType == "MERCHANT")
        history.push("/acqOrder");
      else
        history.push("/acqOrderId");
    };
    var paymentInfo = PaymentStore.getPaymentInfo(query.orderId);
    var orderInfo = {...paymentInfo.orderInfo};
    orderInfo.orderAmt = orderInfo.items.reduce((amt, curP) => amt + curP.price * curP.quantity, 0) - paymentInfo.marketing.amt;
    return <PayForm onPayCompleted={e => {
    Payment.payResult({orderId: query.orderId, state: e == 0, channel: "测试渠道", msg: e == 0 ? "成功" : "失败"});
    redirect();
    }} onCancel={() => {
    Payment.giveUpPay(query.orderId);
    PaymentActiveCreator.cancelPay(query.orderId);
    redirect();
    }} orderInfo={orderInfo}/>;
  }
}
