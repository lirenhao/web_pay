/**
 * Created by cuitao-pc on 16/5/25.
 */
import React, {PropTypes} from 'react';
import JoinOrder from '../../components/JoinOrder/JoinOrder';
import Payment from '../../Payment';
import history from '../../core/history';

function AcqOrderId(props, context) {
  context.setTitle("扫描订单");
  return (
    <div>
      <JoinOrder joinOrder={(id) => {
      Payment.joinOrder(id);
      history.push("/user");
      }}/>
    </div>
  )
}

AcqOrderId.contextTypes = {setTitle: PropTypes.func.isRequired};

export default AcqOrderId;