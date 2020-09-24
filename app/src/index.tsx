import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import I18nProvider from './i18n/I18nProvider';

import store from './store';

import App from './containers/App/App';

import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <I18nProvider>
      <ToastProvider autoDismiss autoDismissTimeout={1500}>
        <App />
      </ToastProvider>
    </I18nProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
