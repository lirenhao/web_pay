/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import OrderInfo from '../OrderInfo';
import MarketingInfo from '../MarketingInfo';
import PayButton from '../PayButton';
import Billing from '../Billing';
import OrderCreateFrom from '../OrderCreateFrom/OrderCreateFrom';
import JoinOrder from '../JoinOrder/JoinOrder';

var App = React.createClass({
  getInitialState: function () {
    return {
      orderInfo: {
        orderId: "12333333",
        products: [{name: "产品1", price: 10, quantity: 1}, {name: "产品2", price: 11.3, quantity: 2}]
      },
      marketing: {
        amt: 20.1,
        msg: "测试优惠"
      },
      payResult: null,
      payStatus: require('../../constants/PaymentConstants.js').default.LocalStatus.ready
    };
  },
  render: function () {

    return (
      <div>
        <div>
          <OrderInfo />
          <MarketingInfo  />
          <Billing />
          <PayButton />
        </div>
        <div>
          <OrderCreateFrom />
        </div>
        <div>
          <JoinOrder />
        </div>
      </div>
    );
  }
});

export default App;