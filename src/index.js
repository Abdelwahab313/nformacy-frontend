import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './index.css';
import Main from 'layouts/Main';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router';
import WebFont from 'webfontloader';
import history from './services/navigation';

WebFont.load({
  google: {
    families: ['Orbitron', 'sans-serif'],
  },
});

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
