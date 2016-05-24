/**
 * Created by cuitao-pc on 16/5/24.
 */

import React from 'react';
import home from './home';
import App from '../components/App';

export default {

  path: '/',

  children: [
    home
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  }

};