import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
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
import './assets/styles/dashboard.css'
import './assets/styles/createCompany.css'
import './assets/styles/loader.css'

import './assets/styles/form.css'
import './assets/styles/confirm.css'

import App from "./components/App";
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
