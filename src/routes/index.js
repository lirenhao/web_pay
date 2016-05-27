/**
 * Created by cuitao-pc on 16/5/24.
 */

import React from 'react';
import user from './user';
import App from '../components/App';
import acqOrderId from './acquisitionOrderId';
import acqOrder from './acquisitionOrder';
import login from './login';
import mer from './mer';
import payment from './payment';

export default {

  path: '/',

  children: [
    user,
    acqOrderId,
    acqOrder,
    login,
    mer,
    payment
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  }

};