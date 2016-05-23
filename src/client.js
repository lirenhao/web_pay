/**
 * Created by cuita on 2016/5/1.
 */

import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import ActionCreator from "./actions/ActionCreator.js";
import Payment from './Payment';

import Const from "./constants/PaymentConstants.js";
var TerminalType = Const.TerminalType;

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

// {id: "001", terminalType: TerminalType.USER}
//ActionCreator.setUserProfile(getJsonFromUrl());
Payment.setUserProfile({id: "001", terminalType: TerminalType.USER});
Payment.setMsgHandler(msg => ActionCreator.serverAction(msg));

window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
  Payment.clientSignIn();
});