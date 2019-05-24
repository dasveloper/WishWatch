import React, { Component, Fragment } from "react";
import { Route, HashRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";
import RouterLink from "react-metismenu-router-link";
import MenuLink from "./MenuLink";
import { AccountNav, SetupNav, AnalyticsNav, SupportNav } from "./NavItems";
import { Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import AddProducts from "./DashboardPanels/AddProducts";
import AddOffers from "./DashboardPanels/AddOffers";

import Profile from "./DashboardPanels/Profile";
import Billing from "./DashboardPanels/Billing";
import StoreOffers from "./DashboardPanels/StoreOffers";
import StoreProducts from "./DashboardPanels/StoreProducts";
import VerifyDomain from "./DashboardPanels/VerifyDomain";

import { Link } from "react-router-dom";
const Analytics = require("analytics-node");

const analytics = new Analytics("2p8ieF9XTkHVmRbyvhZ1RVQsrhu0xg2b");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
    this.setCurrentTab = this.setCurrentTab.bind(this);
  }
  async componentDidMount() {
    console.log(this.props);
    //analytics.track({
    // event: "event name",
    // userId: "123456"
    //});
    if (this.props.auth) {
      this.props.fetchStores(this.props.auth.id);
    }

    let storeId = this.props.match.params.storeId;
    if (storeId) {
      this.props.fetchStoreDetails(storeId);
      this.props.fetchStoreProducts(storeId);
      this.props.fetchStoreOffers(storeId);
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.storeId !== prevProps.match.params.storeId) {
      this.props.fetchStoreDetails(this.props.match.params.storeId);
    }
  }
  setCurrentTab = tab => {
    this.setState({
      currentTab: tab
    });
  };

  renderDashboard() {
    const { currentTab } = this.state;
    switch (this.props.affiliateStore) {
      case null:
        return (
          <div className="loader-wrapper">
            <FontAwesomeIcon className="loader" icon={faSpinner} />
            <p className="loader-text">Loading dashboard...</p>
          </div>
        );
      case false:
        return (
          <div className="affiliate-not-found-wrapper">
            <p className="affiliate-not-found">
              Sorry, we could not find this store.
            </p>
          </div>
        );
      default:
        return (
          <div className="app-main">
            <div className="app-sidebar">
              <div className="app-sidebar__inner">
              <div className="metismenu vertical-nav-menu">
                  <div className="metismenu-container">
                    <MenuLink
                      active={this.props.match.params.section == "getting_started"}
                      icon="pe-7s-browser"
                      label="Getting Started"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "getting-started"
                      }
                    />
                  </div>
                </div>
                <h5 className="app-sidebar__heading">Account</h5>
                <div className="metismenu vertical-nav-menu">
                  <div className="metismenu-container">
                    <MenuLink
                      active={
                        this.props.match.params.section == "profile"
                      }
                      icon="pe-7s-browser"
                      label="Profile"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "profile"
                      }
                    />
                    <MenuLink
                      active={this.props.match.params.section == "billing"}
                      icon="pe-7s-browser"
                      label="Billing"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "billing"
                      }
                    />
                  </div>
                </div>
                <h5 className="app-sidebar__heading">Setup</h5>
                <div className="metismenu vertical-nav-menu">
                  <div className="metismenu-container">
                    <MenuLink
                      active={
                        this.props.match.params.section == "setup_products"
                      }
                      icon="pe-7s-browser"
                      label="Products"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "setup_products"
                      }
                    />
                    <MenuLink
                      active={this.props.match.params.section == "setup_offers"}
                      icon="pe-7s-browser"
                      label="Offers"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "setup_offers"
                      }
                    />
                  </div>
                </div>
                <h5 className="app-sidebar__heading">Analytics</h5>
                <div className="metismenu vertical-nav-menu">
                  <div className="metismenu-container">
                    <MenuLink
                      active={
                        this.props.match.params.section == "analytics_overview"
                      }
                      icon="pe-7s-browser"
                      label="Overview"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "analytics_overview"
                      }
                    />
                    <MenuLink
                      active={
                        this.props.match.params.section == "analytics_customer"
                      }
                      icon="pe-7s-browser"
                      label="Customers"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "analytics_customer"
                      }
                    />
                    <MenuLink
                      active={
                        this.props.match.params.section == "analytics_products"
                      }
                      icon="pe-7s-browser"
                      label="Products"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "analyticsproducts"
                      }
                    />
                    <MenuLink
                      active={
                        this.props.match.params.section == "analytics_offers"
                      }
                      icon="pe-7s-browser"
                      label="Offers"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "analytics_offers"
                      }
                    />
                  </div>
                </div>

                <h5 className="app-sidebar__heading">Support</h5>
                <div className="metismenu vertical-nav-menu">
                  <div className="metismenu-container">
                    <MenuLink
                      active={this.props.match.params.section == "faq"}
                      icon="pe-7s-browser"
                      label="FAQ"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "faq"
                      }
                    />
                    <MenuLink
                      active={this.props.match.params.section == "contact"}
                      icon="pe-7s-browser"
                      label="Contact"
                      to={
                        "/dashboard/" +
                        this.props.match.params.storeId +
                        "/" +
                        "contact"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="app-main__outer">
              <div className="container dashboard-page">
                <Route
                  path={`/dashboard/:storeId?/profile`}
                  component={() => (
                    <div className="dashboard-wrapper">
                    <div className="dashboard-panel">
                      <VerifyDomain
                        affiliateStore={this.props.affiliateStore}
                      />
                    </div>
                    <div className="dashboard-panel">
                      <Profile affiliateStore={this.props.affiliateStore} />
                    </div>
                  </div>
                  )}
                />
                <Route
                  path={`/dashboard/:storeId?/billing`}
                  component={() => (
                    <div className="dashboard-wrapper">
                    <div className="dashboard-panel">
                      <Billing affiliateStore={this.props.affiliateStore} />
                    </div>
                  </div>
                  )}
                />
                  <Route
                  path={`/dashboard/:storeId?/setup_products`}
                  component={() => (
                    <div className="dashboard-wrapper">
                    <div >
                      <AddProducts affiliateStore={this.props.affiliateStore} />
                    </div>
                    <div>
                      <StoreProducts
                        affiliateStore={this.props.affiliateStore}
                        products={this.props.storeProducts}
                      />
                    </div>
                  </div>
                  )}
                />
                   <Route
                  path={`/dashboard/:storeId?/setup_offers`}
                  component={() => (
                    <div className="dashboard-wrapper">
                    <div>
                      <AddOffers affiliateStore={this.props.affiliateStore} />
                    </div>
                    <div className="">
                      <StoreOffers
                        affiliateStore={this.props.affiliateStore}
                        products={this.props.storeProducts}
                      />
                    </div>
                  </div>
                  )}
                />
             
              </div>
            </div>
          </div>
        );
    }
  }
  renderStores() {
    const { stores } = this.props;
    if (stores.length) {
      return stores.map(function(store, key) {
        return (
          <Link
            key={key}
            className="link-wrapper"
            to={"/dashboard/" + store.id}
          >
            <div className="affiliate-avatar-wrapper">
              <div className="affiliate-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>

            <span className="affiliate-link-name">{store.name}</span>
          </Link>
        );
      });
    } else {
      return (
        <div className="empty-link-wrapper">
          <span className="no-stores">No stores found</span>
        </div>
      );
    }
  }
  render() {
    const { stores } = this.props;
    if (this.props.match.params.storeId) {
      return this.renderDashboard();
    } else {
      return (
        <div className="choose-affiliate-wrapper">
          <div className="choose-affiliate-panel">
            <div className="choose-affiliate-header-wrapper">
              <h3 className="choose-affiliate-header">Choose a store</h3>
            </div>
            {stores && this.renderStores()}
            <span className="or">or</span>

            <Link className="create-store-button" to={"/createStore"}>
              Create store
            </Link>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ auth, stores, affiliateStore, storeProducts }) {
  return { auth, stores, affiliateStore, storeProducts };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Dashboard)
);
