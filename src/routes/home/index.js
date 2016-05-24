/**
 * Created by cuitao-pc on 16/5/24.
 */

import React from 'react';
import Home from './Home';

export default {
  path: '/',

  async action() {
    return <Home />;
  }
}