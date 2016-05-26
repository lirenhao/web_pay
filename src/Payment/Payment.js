/**
 * Created by cuita on 2016/5/1.
 */
import Const from '../constants/PaymentConstants';
var ServerCmd = Const.ServerCmd;
class Payment2 {
  constructor() {
    this.msgQueue = [];
  }
  setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  setMsgHandler(handler) {
    this.msgHandler = handler;
  }

  async open() {
    return new Promise((resolve, reject) => {
      if(this.isOpen) {
        this.webSocket = new WebSocket(process.env.wsUrl);
        this.webSocket.onopen = () => {
          this.isOpen = true;
          resolve();
        };
        this.webSocket.onerror = (e) => {
          this.isOpen = false;
          reject();
          while(this.msgQueue.length != 0) {
            this.msgQueue.shift().reject("error")
          }
        };
        this.webSocket.onclose = () => {
          this.isOpen = false;
          while(this.msgQueue.length != 0) {
            this.msgQueue.shift().reject("closed")
          }
        };
        this.webSocket.onmessage = (e) => {
          var {resolve} = this.msgQueue.shift();
          resolve(e.data);
        }
      }
      else {
        resolve();
      }
    });
  }

  async sendMsg(msg) {
    return this.open().then(() => {
      var _msg = {...msg, ...this.userProfile};
      new Promise((resolve, reject) => {
        this.msgQueue.push({resolve, reject});
        this.webSocket.send(JSON.stringify(_msg));
      });
    }).catch(e => {
      console.log("web socket catch:" + e);
      setTimeout(() => this.sendMsg(msg), 1000);
    });
  }
}

class Payment {
  _isSignIn = false;

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
    console.log(err);
  }

  handleOpened() {
  }

  open() {
    if (this._isClosed && !this._waitOpen) {
      try {
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
      } catch (e) {
        console.log(e);
      }
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
    });
    this._isSignIn = true;
  }

  isSignIn() {
    return this._isSignIn;
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