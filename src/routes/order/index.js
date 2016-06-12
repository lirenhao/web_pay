/**
 * Created by cuitao-pc on 16/6/12.
 */
import React from 'react';
import Order from './Order';
import Payment from '../../Payment';

export default {
  path: '/order',

  async action() {
    return <Order isMerchant={Payment.userProfile.terminalType} />;
  }
}