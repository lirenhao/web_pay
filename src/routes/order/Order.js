/**
 * Created by cuitao-pc on 16/5/24.
 */
import React, {PropTypes} from 'react';
import OrderSelector from './OrderSelector';
import OrderInfo from './OrderInfo';
import MarketingInfo from './MarketingInfo';
import Billing from './Billing';
import PayButton from './PayButton';
import Payment from '../../Payment';
import history from '../../core/history';
import s from './Order.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

function Order(props, context) {
  context.setTitle("订单");

  return (
    <div>
      <div className={s.mgtb}>
        <OrderSelector onEmptyOrder={ () => {
      if(props.isMerchant)
        history.push("/acqOrder");
      else
        history.push("/acqOrderId");
      }}/>
        <OrderInfo />
        <MarketingInfo />
        <Billing />
      </div>
      <div className={"navbar-fixed-bottom "+s.bg}>
        <div className={"container "+s.navbg}>
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
      </div>
    </div>

  )
}
Order.propTypes = {isMerchant: PropTypes.bool.isRequired};
Order.contextTypes = {setTitle: PropTypes.func.isRequired};
export default withStyles(s)(Order);