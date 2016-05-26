/**
 * Created by cuitao-pc on 16/5/24.
 */

import React from 'react';
import User from './User';

export default {
  path: '/user',

  async action() {
    return <User />;
  }
}