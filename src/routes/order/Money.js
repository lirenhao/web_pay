/**
 * Created by cuita on 2016/5/2.
 */
import React from 'react';

var Money  = React.createClass({
  render: function () {
    return (
      <span>{this.props.children / 100} 元</span>
    );
  }
});

export default Money;