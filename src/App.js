import 'isomorphic-fetch';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import './styles/common.scss';
import store from 'store';
import Main from 'containers/main';

require('es6-promise').polyfill();

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default hot(App);
