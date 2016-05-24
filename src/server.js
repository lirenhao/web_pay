/**
 * Created by cuita on 2016/5/1.
 */

import express from 'express';
import path from 'path';
import ReactDOM from 'react-dom/server';
import App from './components/App';
import assets from './assets';
import React from 'react';
import { match } from 'universal-router';
import routes from './routes';

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };


    await match(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: styles => css.push(styles._getCss()),
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      }
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});
var port = 3000;

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});