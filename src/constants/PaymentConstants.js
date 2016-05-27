/**
 * Created by cuita on 2016/5/1.
 */

import keyMirror from 'keymirror';

export default {
  OrderEventType: keyMirror({
    ORDER_CHANGED: null,
    ITEMS_CHANGED: null,
    MARKETING_CHANGED: null,
    STATUS_CHANGED: null,
    ORDER_COMPLETED: null
  }),
  ServerCmd: keyMirror({
    CLIENT_SIGN_IN: null,
    CREATE_ORDER: null,
    PAY_AUTH_REQ: null,
    GIVE_UP_PAY: null,
    CANCEL_ORDER: null,
    PAY_RESULT: null,
    JOIN_ORDER: null
  }),
  ClientCmd: keyMirror( {
    ORDER_ITEMS: null,
    MARKETING: null,
    PAY_COMPLETED: null,
    PAY_AUTH: null,
    PAYING: null,
    REMOVE_COMPLETED_ORDER: null,
    SELECT_ORDER: null
  }),
  LocalStatus: keyMirror({
    UNREADY: null,
    READY: null,
    PAY_COMPLETED: null,
    WAIT_PAY_AUTH: null,
    PAY_AUTH: null
  }),
  TerminalType: keyMirror({
    MERCHANT: null,
    USER: null
  })
};