/**
 * Created by cuita on 2016/5/1.
 */
import Const from '../constants/PaymentConstants';
var ServerCmd = Const.ServerCmd;

class Payment {

  constructor() {
    this._isClosed = true;
    this._waitOpen = false;
    this._tmpMessages = [];
  }

  setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  setMsgHandler(handler) {
    this.msgHandler = handler;
  }

  handleMsg(msg) {
    this.msgHandler(msg);
  }

  handleErr(err) {
  }

  handleOpened() {
  }

  open() {
    if (this._isClosed && !this._waitOpen) {
      this._waitOpen = true;
      this.webSocket = new WebSocket(process.env.wsUrl);
      this.webSocket.onopen = (event) => {
        this._isClosed = false;
        this._waitOpen = false;
        this.handleOpened();
        this._tmpMessages.forEach(msg => Payment.prototype.send.call(this, msg));
        this._tmpMessages = [];
      };
      this.webSocket.onclose = (event) => {
        this._isClosed = true;
      };

      this.webSocket.onmessage = (event) => {
        this.handleMsg(JSON.parse(event.data));
      };

      this.webSocket.onerror = this.handleErr;
    }
  }

  close() {
    if (!this._isClosed) {
      this.webSocket.close();
      this._isClosed = true;
      this._tmpMessages = [];
    }
  }

  send(msg) {
    var _msg = {...msg, ...this.userProfile};
    this.open();
    if (this._isClosed) {
      this._tmpMessages.push(_msg);
    } else {
      this.webSocket.send(JSON.stringify(_msg));
    }
  }

  clientSignIn() {
    this.send({
      eventType: ServerCmd.CLIENT_SIGN_IN,
      ...this.userProfile
    })
  }

  createOrder(orderInfo) {
    this.send({
      eventType: ServerCmd.CREATE_ORDER,
      ...orderInfo
    });
  }

  joinOrder(orderId) {
    this.send({
      eventType: ServerCmd.JOIN_ORDER,
      orderId: orderId
    })
  }

  reqPayAuth(orderId) {
    this.send({
      eventType: ServerCmd.PAY_AUTH_REQ,
      orderId: orderId
    });
  }

  giveUpPay(orderId) {
    this.send({
      eventType: ServerCmd.GIVE_UP_PAY,
      orderId: orderId
    });
  }

  cancelOrder(orderId) {
    this.send({
      eventType: ServerCmd.CANCEL_ORDER,
      orderId: orderId
    })
  }

  payResult(result) {
    this.send({
      eventType: ServerCmd.PAY_RESULT,
      ...result
    })
  }
}

export {Payment};
export default new Payment();