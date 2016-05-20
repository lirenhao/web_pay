/**
 * Created by cuita on 2016/5/1.
 */
import Promise from 'bluebird';

class Payment {

  constructor() {
    this._isClosed = true;
    this._waitOpen = false;
    this._tmpMessages = [];
  }

  msgHandle(msg) {
  }

  errorHandle(err) {
  }

  openedHandle() {
  }

  open() {
    if (this._isClosed && !this._waitOpen) {
      this._waitOpen = true;
      this.webSocket = new WebSocket(process.env.wsUrl);
      this.webSocket.onopen = (event) => {
        this._isClosed = false;
        this._waitOpen = false;
        this.openedHandle();
        this._tmpMessages.forEach(msg => Payment.prototype.send.call(this, msg));
        this._tmpMessages = [];
      };
      this.webSocket.onclose = (event) => {
        this._isClosed = true;
      };

      this.webSocket.onmessage = (event) => {
        this.msgHandle(JSON.parse(event.data));
      };

      this.webSocket.onerror = this.errorHandle;
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
    if (this._isClosed) {
      this._tmpMessages.push(msg);
    } else {
      this.webSocket.send(JSON.stringify(msg));
    }
  }
}

export default Payment;