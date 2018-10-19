import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import 'normalize.css';
import './assets/styles/base.css'
import './assets/styles/header.css'
import './assets/styles/landing.css'
import './assets/styles/prodBlockMockup.css'
import './assets/styles/browserMockup.css'
import './assets/styles/statsMockup.css'
import './assets/styles/emailMockup.css'
import './assets/styles/emailModal.css'
import './assets/styles/wishlist.css'
import './assets/styles/prodBlock.css'
import './assets/styles/addProduct.css'

import App from "./components/App";
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
