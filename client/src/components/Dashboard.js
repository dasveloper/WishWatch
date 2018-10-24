import React from "react";
import Profile from "./DashboardPanels/Profile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddProducts from "./DashboardPanels/AddProducts";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.timer = this.timer.bind(this);
  }

  async componentDidMount() {
    let affiliateId = this.props.match.params.affiliateId;
    if (affiliateId) {
      this.props.fetchAffilliateDetails(affiliateId);
    }
  }

  renderDashboard() {

    switch (this.props.affiliate) {
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
            <p className="affiliate-not-found">Sorry, we could not find this company.</p>
          </div>
        );
      default:
        return (
          <div className="container dashboard-page">
            <div className="dashboard-sidebar">
              <span className="sidebar-section-header">Account</span>
              <a className="sidebar-link active">Profile</a>
              <a className="sidebar-link">Billing</a>
              <span className="sidebar-section-header">Setup</span>
              <a className="sidebar-link">Products</a>
              <a className="sidebar-link">Offers</a>
              <span className="sidebar-section-header">Analytics</span>

              <a className="sidebar-link">Products</a>
              <a className="sidebar-link">Offers</a>
              <span className="sidebar-section-header">Support</span>

              <a className="sidebar-link">Contact</a>
            </div>
            <div className="dashboard-wrapper">
              {false && <div className="dashboard-panel">
                <Profile affiliate={this.props.affiliate} />
              </div>}
              <div className="dashboard-panel">
                <AddProducts affiliate={this.props.affiliate} />
              </div>
            </div>
          </div>
        );
    }
  }
  render() {
    return this.renderDashboard();
  }
}

function mapStateToProps({ auth, affiliate }) {
  return { auth, affiliate };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Dashboard)
);
