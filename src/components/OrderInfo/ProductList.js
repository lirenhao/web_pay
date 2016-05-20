/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import Product from './Product';

var ProductList = React.createClass({
  render: function () {
    let rows = this.props.products.map( p => (<Product key={p.name} {...p} />))

    return (
      <table>
        <thead>
        <tr>
          <th>名称</th>
          <th>价格</th>
          <th>数量</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

export default ProductList;