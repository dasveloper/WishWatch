import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
//mport "normalize.css";
import "./assets/styles/base.scss";
import './assets/base-architect.scss';

import App from "./components/App";
import reducers from "./reducers";

const enhancers = [reduxThunk];
const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
