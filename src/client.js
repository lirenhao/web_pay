/**
 * Created by cuita on 2016/5/1.
 */

import React from "react";
import ReactDOM from "react-dom";
import ActionCreator from "./actions/ActionCreator.js";
import Payment from "./Payment";
import FastClick from "fastclick";
import {match} from "universal-router";
import routes from "./routes";
import history from './core/history';
import Const from "./constants/PaymentConstants.js";
var TerminalType = Const.TerminalType;

const context = {
  insertCss: styles => styles["_insertCss"](),
  setTitle: value => (document.title = value),
  setMeta: (name, content) => {
    const elements = document.getElementsByTagName('meta');
    Array.from(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document
      .getElementsByTagName('head')[0]
      .appendChild(meta);
  }
};

let renderComplete = (callback) => {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  callback(true);

  renderComplete = (cb) => {
    cb(true);
  }
};

function render(container, component) {
  return new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        component,
        container,
        renderComplete.bind(undefined, resolve)
      );
    } catch (err) {
      reject(err)
    }
  })
}

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function run() {
  const container = document.getElementById('app');
  FastClick.attach(document.body);
  const removeHistoryListener = history.listen(location => {
    match(routes, {
      path: window.location.pathname,
      context,
      render: render.bind(undefined, container)
    }).catch(err => console.error(err));
  });
  addEventListener(window, 'pagehide', () => {
    removeHistoryListener();
  });
}
window.addEventListener("load", () => {
  Payment.setMsgHandler(msg => ActionCreator.serverAction(msg));
  run();
});
