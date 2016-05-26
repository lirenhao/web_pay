/**
 * Created by cuitao-pc on 16/5/25.
 */

import React from 'react';
import Login from './Login';

export default {
  path: "/",
  async action() {
    return <Login />;
  }
}