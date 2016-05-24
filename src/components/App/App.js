/**
 * Created by cuita on 2016/5/1.
 */

import React, {PropTypes} from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

var App = React.createClass({
  getInitialState: function () {
    return {
      orderInfo: {
        orderId: "12333333",
        products: [{name: "产品1", price: 10, quantity: 1}, {name: "产品2", price: 11.3, quantity: 2}]
      },
      marketing: {
        amt: 20.1,
        msg: "测试优惠"
      },
      payResult: null,
      payStatus: require('../../constants/PaymentConstants.js').default.LocalStatus.READY
    };
  },
  childContextTypes: {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  },
  getChildContext: function() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction
    }
  },
  componentWillMount: function() {
    //const { insertCss } = this.props.context;
    //this.removeCss = insertCss(s);
  },
  componentWillUnmount: function() {
    //this.removeCss();
  },
  render: function () {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default App;