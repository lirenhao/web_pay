/**
 * Created by cuitao-pc on 16/5/25.
 */

import React, {PropTypes} from 'react';
import OrderCreateFrom from './OrderCreateFrom';
import Payment from '../../Payment/Payment';
import history from '../../core/history';

function AcqOrder(props, context) {
	context.setTitle("创建订单");
	var items = [
		{
			name: "ONLY修身撞色拼接女针织裙",
			price: 34950,
			quantity: 2
		},
		{
			name: "ONLY圆点荷叶边女修身裙",
			price: 19950,
			quantity: 1
		},
		{
			name: "ONLY棉宽松字母牛仔女外套",
			price: 27450,
			quantity: 1
		}
	];
	return (
		<OrderCreateFrom
			items={items}
			createOrder={items => {
          Payment.createOrder({items: items});
          history.push("/order");}}
			onEntryOrder={() => history.push("/order") }/>
	);
}

AcqOrder.contextTypes = {setTitle: PropTypes.func.isRequired};
export default AcqOrder;