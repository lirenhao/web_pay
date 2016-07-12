/**
 * Created by ALIENWARE17 on 2016/6/15.
 */
import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import Payment from '../../Payment/Payment';
import history from '../../core/history';
import s from './PayForm.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Table, ButtonGroup, Button} from 'react-bootstrap';

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
			<div className={s.mgtb}>
				<div className={s.mgb}>
					<span className={s.mgr}><b>订单号:</b>{orderInfo.orderId}</span>
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
					<th className={s.thColor}>商品名称</th>
					<th className={s.thColor}>单价</th>
					<th className={s.thColor}>数量</th>
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
				<div className="navbar navbar-default navbar-fixed-bottom">
					<div className={"container "+s.topbottom}>
						<ButtonGroup justified>
							<ButtonGroup>
								<select className={"btn btn-default "+s.selectH} ref={c => selector = c}>
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
					</div>
				</div>
			</div>
		);
	}
});

export default withStyles(s)(PayForm);