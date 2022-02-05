import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

// IMPORT PROJECT REFERENCES

import { store } from './AppStore';
import AppRouter from './AppRouter';
import HttpUtil from './common/HttpUtil';

import './App.scss';

// COMPONENT

HttpUtil.initialize(store.dispatch);

export const App = () => (
  <Provider store={store}>
    <Fragment>
      <AppRouter />
    </Fragment>
  </Provider>
);
