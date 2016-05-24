/**
 * Created by cuitao-pc on 16/5/24.
 */
import React, {PropTypes} from 'react';
import OrderSelector from '../../components/OrderSelector/OrderSelector';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import MarketingInfo from '../../components/MarketingInfo/MarketingInfo';
import Billing from '../../components/Billing/Billing';
import PayButton from '../../components/PayButton/PayButton';
import OrderCreateFrom from '../../components/OrderCreateFrom/OrderCreateFrom';
import JoinOrder from '../../components/JoinOrder/JoinOrder';

function Home(props, context) {
  context["setTitle"]("H O M E");

  return (
    <div>
      <div>
        <OrderSelector />
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
  )
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };
export default Home;