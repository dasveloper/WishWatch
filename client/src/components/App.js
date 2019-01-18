import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Wishlist from "./Wishlist";
import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";
import CreateStore from "./CreateStore";

import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="master-wrapper">
          <Header />
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/wishlist" component={Wishlist} />
          <PrivateRoute path="/add/:storeId/:productId" component={AddProduct} />
          <Route
            exact
            path="/login"
            component={() => <Login isSignup={false} />}
          />
          <Route
            exact
            path="/signup"
            component={() => <Login isSignup={true} />}
          />

          <PrivateRoute exact path="/createStore" component={CreateStore} />

          <PrivateRoute path="/dashboard/:storeId?" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
