/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import Money from '../Money';

var Product = React.createClass({
  render: function () {
    return (<tr><td>{this.props.name}</td><td><Money>{this.props.price}</Money></td><td>{this.props.quantity}</td></tr>)
  }
});

export default Product;