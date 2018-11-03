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
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/add" component={AddProduct} />
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

          <Route exact path="/createStore" component={CreateStore} />

          <Route path="/dashboard/:affiliateId?" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
