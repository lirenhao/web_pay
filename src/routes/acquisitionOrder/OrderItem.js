/**
 * Created by cuitao-pc on 16/5/19.
 */
import React from 'react'
import s from './AcqOrder.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {InputGroup, Glyphicon, Button, FormGroup, FormControl} from 'react-bootstrap';

var OrderItem = React.createClass({
	render: function () {
		return (
			<div className={s.mgt}>
				<FormGroup className={"text-center " + s.mgb}>
					<InputGroup>
						<InputGroup.Addon className={s.noBLR}>
							<Glyphicon glyph="shopping-cart"/>
						</InputGroup.Addon>
						<label className="sr-only " htmlFor="productName">productName</label>
						<FormControl className={s.inputRadius} name="items.name" id="productName"
												 value={this.props.name}
												 onChange={this.props.nameChange}
												 placeholder="商品名称"/>
					</InputGroup>
					<InputGroup className={s.top1}>
						<InputGroup.Addon className={s.noALR + " " + s.inputRadius}>
							<Glyphicon glyph="yen"/>
						</InputGroup.Addon>
						<label className="sr-only" htmlFor="price">price</label>
						<FormControl className={s.inputRadius} id="price" name="items.price"
												 value={this.props.price}
												 onChange={this.props.priceChange}
												 placeholder="单价"/>
					</InputGroup>
					<InputGroup className={s.top2}>
						<InputGroup.Addon className={s.noALR + " " + s.inputRadius}>
							<Glyphicon glyph="tags"/>
						</InputGroup.Addon>
						<label className="sr-only" for="counts">counts</label>
						<FormControl className={s.noRightBorderR} id="counts" name="items.quantity"
												 value={this.props.quantity}
												 onChange={this.props.quantityChange}
												 placeholder="数量"/>
					</InputGroup>
					<InputGroup className={s.divRemove}>
						<Button className={s.btnRemove}
										onClick={this.props.deleteItem}>删除</Button>
					</InputGroup>
				</FormGroup>
			</div>
		)
	}
});

export default withStyles(s)(OrderItem);