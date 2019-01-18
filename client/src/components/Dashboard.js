import React from "react";
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
    analytics.track({
      event: "event name",
      userId: "123456"
    });
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
          <div className="container dashboard-page">
            <div className="dashboard-sidebar">
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("GETTING_STARTED")}
                className={`getting-started sidebar-link ${
                  currentTab === "GETTING_STARTED" ? "active" : undefined
                }`}
              >
                Getting started
              </a>
              <span className="sidebar-section-header">ACCOUNT</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("PROFILE")}
                className={`sidebar-link ${
                  currentTab === "PROFILE" ? "active" : undefined
                }`}
              >
                Profile
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("BILLING")}
                className={`sidebar-link ${
                  currentTab === "BILLING" ? "active" : undefined
                }`}
              >
                Billing
              </a>
              {/*<a
                href="javascript:;"
                onClick={() => this.setCurrentTab("SETTINGS")}
                className={`sidebar-link ${
                  currentTab === "SETTINGS" ? "active" : undefined
                }`}
              >
                Settings
              </a>*/}
              <span className="sidebar-section-header">SETUP</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("PRODUCT_SETUP")}
                className={`sidebar-link ${
                  currentTab === 2 ? "PRODUCT_SETUP" : undefined
                }`}
              >
                Products
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("OFFER_SETUP")}
                className={`sidebar-link ${
                  currentTab === "OFFER_SETUP" ? "active" : undefined
                }`}
              >
                Offers
              </a>
              <span className="sidebar-section-header">ANALYTICS</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("ANALYTICS_OVERVIEW")}
                className={`sidebar-link ${
                  currentTab === "ANALYTICS_OVERVIEW" ? "active" : undefined
                }`}
              >
                Overview
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("CUSTOMER_ANALYTICS")}
                className={`sidebar-link ${
                  currentTab === "CUSTOMER_ANALYTICS" ? "active" : undefined
                }`}
              >
                Customers
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("PRODUCT_ANALYTICS")}
                className={`sidebar-link ${
                  currentTab === "PRODUCT_ANALYTICS" ? "active" : undefined
                }`}
              >
                Products
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("OFFER_ANALYTICS")}
                className={`sidebar-link ${
                  currentTab === "OFFER_ANALYTICS" ? "active" : undefined
                }`}
              >
                Offers
              </a>
              <span className="sidebar-section-header">SUPPORT</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("SUPPORT")}
                className={`sidebar-link ${
                  currentTab === "SUPPORT" ? "active" : undefined
                }`}
              >
                FAQ
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab("CONTACT")}
                className={`sidebar-link ${
                  currentTab === "CONTACT" ? "active" : undefined
                }`}
              >
                Contact
              </a>
            </div>
            {currentTab === "PROFILE" && (
              <div className="dashboard-wrapper">
                <div className="dashboard-panel">
                  <VerifyDomain affiliateStore={this.props.affiliateStore} />
                </div>
                <div className="dashboard-panel">
                  <Profile affiliateStore={this.props.affiliateStore} />
                </div>
              </div>
            )}
            {currentTab === "BILLING" && (
              <div className="dashboard-wrapper">
                <div className="dashboard-panel">
                  <Billing affiliateStore={this.props.affiliateStore} />
                </div>
              </div>
            )}
            {currentTab === "PRODUCT_SETUP" && (
              <div className="dashboard-wrapper">
                <div className="dashboard-panel">
                  <AddProducts affiliateStore={this.props.affiliateStore} />
                </div>
                <div className="dashboard-panel">
                  <StoreProducts
                    affiliateStore={this.props.affiliateStore}
                    products={this.props.storeProducts}
                  />
                </div>
              </div>
            )}
                        {currentTab === "OFFER_SETUP" && (
              <div className="dashboard-wrapper">
                <div className="dashboard-panel">
                  <AddOffers affiliateStore={this.props.affiliateStore} />
                </div>
                <div className="dashboard-panel">
                  <StoreOffers
                    affiliateStore={this.props.affiliateStore}
                    products={this.props.storeProducts}
                  />
                </div>
              </div>
            )}
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
