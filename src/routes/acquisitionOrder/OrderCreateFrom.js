/**
 * Created by cuitao-pc on 16/5/19.
 */
import React, {PropTypes} from 'react';
import OrderItem from './OrderItem';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import './AcqOrder.scss';
import {Nav, Button, ButtonGroup, Navbar} from 'react-bootstrap';

var OrderEventType = Const.OrderEventType;

var OrderCreateFrom = React.createClass({
	propTypes: {
		items: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})),
		createOrder: PropTypes.func.isRequired,
		onEntryOrder: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {items: this.props.items} || {items: []};
	},
	componentDidMount: function () {
		PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	componentWillUnmount: function () {
		PaymentStore.removeChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
	},
	_onChange: function () {
		this.forceUpdate();
	},
	handleChange: function (index, name, value) {
		this.state.items[index][name] = value;
		this.forceUpdate();
	},
	render: function () {
		var s2i = (v, defaultV, minLen, maxLen) => {
			var regex = new RegExp("^[0-9]{" + minLen + "," + maxLen + "}$");
			if (regex.test(v))
				return parseInt(v);
			else if (v == "")
				return "";
			else
				return defaultV;
		};
		var children = this.state.items.map((p, index) => (<OrderItem
			key={index} {...p}
			nameChange={e => this.handleChange(index, "name", e.target.value)}
			priceChange={e => this.handleChange(index, "price", s2i(e.target.value, this.state.items[index]["price"], 1, 6))}
			quantityChange={e => this.handleChange(index, "quantity", s2i(e.target.value, this.state.items[index]["quantity"], 1, 3))}
			deleteItem={() => {
        this.state.items.splice(index, 1);
        this.forceUpdate();
      }}
		/>));
		var getItems = () => {
			return this.state.items.filter((r) => r.name.trim() != "" && r.price != "" && r.price != 0 && r.quantity != "" && r.quantity != 0);
		};
		let hidden = "";
		hidden += PaymentStore.getOrderIds().length != 0 ? "" : "hidden";
		let btnRadius = "";
		btnRadius += PaymentStore.getOrderIds().length != 0 ? "" : "btnradius";

		return (
			<div>
				<div className={"mgtb"}>
					{children}
				</div>
				<Navbar className={"navbar-fixed-bottom "+"topbottom"}>
					<ButtonGroup justified>
						<ButtonGroup>
							<Button
								onClick={() => this.setState({items: [...this.state.items, {name: "", price: "", quantity: ""}]})}>
								添加</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button
								bsStyle="success"
								className={btnRadius}
								onClick={() => {
					  let items = getItems();
					  if(items.length > 0)
					  this.props.createOrder(items)}}
								disabled={getItems().length == 0}>
								提交</Button>
						</ButtonGroup>
						<ButtonGroup className={hidden}>
							<Button
								bsStyle="info"
								onClick={e => this.props.onEntryOrder()}>
								<span className="badge">{PaymentStore.getOrderIds().length}</span>&nbsp;个待支付
							</Button>
						</ButtonGroup>
					</ButtonGroup>
				</Navbar>
			</div>
		)
	}
});

export default OrderCreateFrom;