/**
 * Created by cuitao-pc on 16/5/25.
 */
import React from 'react';
import AcqOrder from './AcqOrder';
export default {
  path: '/acqOrder',

  async action() {
    return <AcqOrder />;
  }
}