/**
 * Created by cuita on 2016/5/1.
 */
import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import PaymentActionCreator from '../../actions/PaymentActionCreator';
import s from './Order.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {ButtonGroup, Button,} from 'react-bootstrap';

var LocalStatus = Const.LocalStatus;
var OrderEventType = Const.OrderEventType;

var PayButton = React.createClass({
	propTypes: {
		onPay: PropTypes.func.isRequired,
		onReqPay: PropTypes.func.isRequired,
		canCancel: PropTypes.bool.isRequired,
		onCancel: PropTypes.func
	},
	getInitialState: function () {
		return {
			payStatus: PaymentStore.getPayStatus()
		};
	},
	componentDidMount: function () {
		PaymentStore.addChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
		PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	componentWillUnmount: function () {
		PaymentStore.removeChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
		PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	_onChange: function () {
		var payState = PaymentStore.getPayStatus();
		this.setState({
			payStatus: PaymentStore.getPayStatus()
		});
		if (payState == LocalStatus.PAY_AUTH) {
			this.props.onPay(PaymentStore.getCurrentOrderId());
		}
	},
	render: function () {
		let payButton = "success";
		let payClass = "";
		let cancelClass = "";
		let disabled = false;
		let oneButton = "";

		switch (this.state.payStatus) {
			case LocalStatus.READY:
				break;
			case LocalStatus.WAIT_PAY_AUTH:
				payButton = "warning";
				disabled = true;
				break;
			default:
				payClass += "hidden ";
				oneButton += s.payRadius;//单个按钮时，强化按钮圆角样式
				break;
		}
		if (!(this.props.canCancel && PaymentStore.getCurrentOrderId() != undefined)) {
			cancelClass += "hidden";
			oneButton += s.payRadius;//单个按钮时，强化按钮圆角样式
		}
		return (
			<ButtonGroup justified>
				<ButtonGroup className={payClass}>
					<Button bsStyle={payButton}
									className={oneButton}
									onClick={() => {
          					var orderId = PaymentStore.getCurrentOrderId();
          					PaymentActionCreator.paying(orderId);
          					this.props.onReqPay(orderId);}}
									disabled={disabled}
					>支付
					</Button>
				</ButtonGroup>
				<ButtonGroup className={cancelClass}>
					<Button bsStyle="danger"
									className={oneButton}
									onClick={() => {
        						this.props.onCancel(PaymentStore.getCurrentOrderId());
        						PaymentActionCreator.removeOrder(PaymentStore.getCurrentOrderId());}}>取消
					</Button>
				</ButtonGroup>
			</ButtonGroup>
		);
	}
});

export default withStyles(s)(PayButton);