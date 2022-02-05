// IMPORT PACKAGE REFERENCES

import { createStore, applyMiddleware } from 'redux';

// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
// IMPORT REDUCERS

import { AppReducer } from './AppReducer';
import { translations } from './translations';
import promise from 'redux-promise-middleware';

// CONFIGURE STORE

export const store = createStore(AppReducer, applyMiddleware(thunk, promise));
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('tr'));
