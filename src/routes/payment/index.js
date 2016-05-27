/**
 * Created by cuitao-pc on 16/5/27.
 */
import React from 'react';
import PayForm from './PayForm';
import PaymentStore from '../../stores/PaymentStore';

export default {
  path: "/payment",

  async action({query}) {
    var paymentInfo = PaymentStore.getPaymentInfo(query.orderId);
    var orderInfo = {...paymentInfo.orderInfo};
    orderInfo.orderAmt = orderInfo.items.reduce((amt, curP) => amt + curP.price * curP.quantity, 0) - paymentInfo.marketing.amt;
    return <PayForm onPayCompleted={e => console.log(e)} orderInfo={orderInfo}/>;
  }
}
