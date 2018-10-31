import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Wishlist from "./Wishlist";
import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";
import CreateCompany from "./CreateCompany";
import ChooseAffiliate from "./ChooseAffiliate";


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
          <Route exact path="/createCompany" component={CreateCompany} />

          <Route path="/dashboard/:affiliateId?" component={Dashboard} />
          <Route path="/chooseAffiliate" component={ChooseAffiliate} />

          {/*<Route path="/surveys/new" component={SurveyNew} />*/}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
