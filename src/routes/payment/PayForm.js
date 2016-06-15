/**
 * Created by ALIENWARE17 on 2016/6/15.
 */
import React, {PropTypes} from 'react';
import PaymentStore from '../../stores/PaymentStore.js';
import Const from '../../constants/PaymentConstants.js';
import Payment from '../../Payment/Payment';
import history from '../../core/history';

var OrderEventType = Const.OrderEventType;
var orderList = [];

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
        var orders = PaymentStore.getOrderIds();
        for (var i = 0; i < orders.length; i++) {
            orderList.push(orders[i].orderId);
        }
    },
    componentDidUpdate: function () {
        PaymentStore.addChangeListener(OrderEventType.STATUS_CHANGED, this._onChange);
        PaymentStore.addChangeListener(OrderEventType.ORDER_CHANGED, this._onChange);
    },
    componentWillUnmount: function () {
        orderList = [];
    },
    _onChange: function () {
        if (orderList.indexOf(this.props.orderInfo.orderId) != -1) {
            if (Payment.userProfile.terminalType == "USER") {
                history.push("/acqOrderId");
            }
            else
                history.push("/acqOrder");
        }
    },
    getOrderInfoComponent: function (orderInfo) {
        return (
            <div>
                <h1>{orderInfo.orderId}</h1>
                <h2>{orderInfo.orderAmt}</h2>
                {this.getOrderItemComponents(orderInfo.items)}
            </div>
        );
    },
    getOrderItemComponents: function (items) {
        return (
            <ol>
                {items.map(({name, price, quantity}, i) =>
                    <li key={i}>{name}
                        <ul>
                            <li>{price}</li>
                            <li>{quantity}</li>
                        </ul>
                    </li>
                )}
            </ol>
        );
    },
    render: function () {
        var selector;
        return (
            <div>
                {this.getOrderInfoComponent(this.props.orderInfo)}
                <select ref={c => selector = c}>
                    <option value="0">成功</option>
                    <option value="1">失败</option>
                </select>
                <input value="确定" type="button" onClick={e => this.props.onPayCompleted(selector.value)}/>
                <input value="取消支付" type="button" onClick={this.props.onCancel}/>
            </div>
        );
    },
});

export default PayForm;