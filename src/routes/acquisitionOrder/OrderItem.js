/**
 * Created by cuitao-pc on 16/5/19.
 */
import React from 'react'
import './AcqOrder.scss';
import {InputGroup, Glyphicon, Button, FormGroup, FormControl, Form, ControlLabel} from 'react-bootstrap';

var OrderItem = React.createClass({
	getValidationName: function () {
		let length = this.props.name.length;
		if (length) return 'success';
		else if (length == 0) return 'warning';
		else return 'error';
	},
	getValidationPrice: function () {
		let length = this.props.price;
		if (length) return 'success';
		else if (length == 0) return 'warning';
		else return 'error';
	},
	getValidationQuantity: function () {
		let length = this.props.quantity;
		if (length) return 'success';
		else if (length == 0) return 'warning';
		else return 'error';
	},
	render: function () {
		return (
			<Form inline className={"mgt"}>
				<FormGroup className={"col4"} controlId="productName"
									 validationState={this.getValidationName()}
				>
					<InputGroup className={"top0"+" "+"widthP"}>
						<InputGroup.Addon className={"noBLR"}>
							<Glyphicon glyph="shopping-cart"/>
						</InputGroup.Addon>
						<ControlLabel className="sr-only ">productName</ControlLabel>
						<FormControl className={"inputRadius"} name="items.name"
												 value={this.props.name}
												 onChange={this.props.nameChange}
												 placeholder="商品名称"/>
						<FormControl.Feedback/>
					</InputGroup>
				</FormGroup>
				<FormGroup className={"col4"} controlId="productPrice"
									 validationState={this.getValidationPrice()}>
					<InputGroup className={"top1"+" "+"widthP"}>
						<InputGroup.Addon className={"noALR" + " " + "inputRadius"}>
							<Glyphicon glyph="yen"/>
						</InputGroup.Addon>
						<ControlLabel className="sr-only ">productPrice</ControlLabel>
						<FormControl className={"inputRadius"} name="items.price"
												 value={this.props.price}
												 onChange={this.props.priceChange}
												 placeholder="单价(分)"/>
						<FormControl.Feedback/>
					</InputGroup>
				</FormGroup>
				<FormGroup className={"col4"+" "+"padding"} controlId="productCounts"
									 validationState={this.getValidationQuantity()}>
					<InputGroup className={"top2"+" "+"widthP"}>
						<InputGroup.Addon className={"noTLR" + " " + "inputRadius"}>
							<Glyphicon glyph="tags"/>
						</InputGroup.Addon>
						<ControlLabel className="sr-only ">productCounts</ControlLabel>
						<FormControl className={"noRightBorderR"} name="items.quantity"
												 value={this.props.quantity}
												 onChange={this.props.quantityChange}
												 placeholder="数量"/>
						<FormControl.Feedback/>
					</InputGroup>
				</FormGroup>
				<InputGroup className={"divRemove"}>
					<Button className={"btnRemove"}
									onClick={this.props.deleteItem}>删除</Button>
				</InputGroup>
			</Form>
		)
	}
});

export default OrderItem;