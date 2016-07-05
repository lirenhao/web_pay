/**
 * Created by cuita on 2016/5/1.
 */

import React from 'react';
import Product from './Item';
import {Table} from 'react-bootstrap';
import s from './Order.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


var ItemList = React.createClass({
  render: function () {
    let rows = this.props.items.map( p => (<Product key={p.name} {...p} />));

    return (
      <Table striped>
        <thead>
        <tr>
          <th className={s.thColor}>名称</th>
          <th className={s.thColor}>价格</th>
          <th className={s.thColor}>数量</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
});

export default withStyles(s)(ItemList);