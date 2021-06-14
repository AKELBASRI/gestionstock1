import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose }from "redux";
import  {Provider}  from "react-redux";
import thunk from 'redux-thunk';
import rootReducers from "./reducers";
import Routes from './Routes';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <Routes />
    </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

