/**
 * Created by cuita on 2016/5/1.
 */

import keyMirror from 'keymirror';

export default {
  EventType: keyMirror({
    ORDER_ITEMS: null,
    MARKETING: null,
    PAY_COMPLETED: null,
    PAY_AUTH: null,

    CLIENT_SIGN_IN: null,
    CREATE_ORDER: null,
    PAY_AUTH_REQ: null,
    GIVE_UP_PAY: null,
    CANCEL_ORDER: null,
    PAY_RESULT: null,
    JOIN_ORDER: null,

    STATUS_CHANGE: null

  }),
  LocalStatus: keyMirror({
    UNREADY: null,
    READY: null,
    PAY_COMPLETED: null,
    WAIT_PAY_AUTH: null
  }),
  TerminalType: keyMirror({
    MERCHANT: null,
    USER: null
  })
};