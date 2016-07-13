/**
 * Created by ALIENWARE17 on 2016/6/15.
 */
import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import Payment from '../../Payment/Payment';
import history from '../../core/history';
import './PayForm.scss';
import {Table, ButtonGroup, Button,Navbar} from 'react-bootstrap';

var OrderEventType = Const.OrderEventType;

var PayForm = React.createClass({
	propTypes: {
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
	},
	componentDidMount: function () {
		document.title = "支付";
		PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	componentWillUnmount: function () {
		PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	_onChange: function () {
		if (PaymentStore.getOrderIds().filter(v => v.orderId == this.props.orderInfo.orderId).length == 0) {
			if (Payment.userProfile.terminalType == "USER") {
				history.push("/acqOrderId");
			}
			else
				history.push("/acqOrder");
		}
	},
	getOrderInfoComponent: function (orderInfo) {
		return (
			<div className={"mgtb"}>
				<div className={"mgb"}>
					<span className={"mgr"}><b>订单号:</b>{orderInfo.orderId}</span>
					<span><b>流水号:</b>{orderInfo.orderAmt}</span>
				</div>
				<div className="panel panel-info">
					{this.getOrderItemComponents(orderInfo.items)}
				</div>
			</div>
		);
	},
	getOrderItemComponents: function (items) {
		return (
			<Table striped>
				<thead>
				<tr className="bg-info ">
					<th className={"thColor"}>商品名称</th>
					<th className={"thColor"}>单价</th>
					<th className={"thColor"}>数量</th>
				</tr>
				</thead>
				<tbody>
				{items.map(({name, price, quantity}, i) =>
					<tr key={i}>
						<td>{name}</td>
						<td>{price}</td>
						<td>{quantity}</td>
					</tr>
				)}
				</tbody>
			</Table>
		);
	},
	render: function () {
		var selector;
		return (
			<div>
				{this.getOrderInfoComponent(this.props.orderInfo)}
				<Navbar className={" navbar-fixed-bottom "+"topbottom"}>
					<ButtonGroup justified>
						<ButtonGroup>
							<select className={"btn btn-default "+"selectH"} ref={c => selector = c}>
								<option value="0">成功</option>
								<option value="1">失败</option>
							</select>
						</ButtonGroup>
						<ButtonGroup>
							<Button bsStyle="success"
											onClick={e => this.props.onPayCompleted(selector.value)}>确定
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button bsStyle="danger"
											onClick={this.props.onCancel}>取消支付
							</Button>
						</ButtonGroup>
					</ButtonGroup>
				</Navbar>
			</div>
		);
	}
});

export default PayForm;