import React from "react";
import Profile from "./DashboardPanels/Profile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import AddProducts from "./DashboardPanels/AddProducts";
import AffiliateProducts from "./DashboardPanels/AffiliateProducts";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
    this.setCurrentTab = this.setCurrentTab.bind(this);
  }

  async componentDidMount() {
    let affiliateId = this.props.match.params.affiliateId;
    if (affiliateId) {
      this.props.fetchAffiliateDetails(affiliateId);
      this.props.fetchAffiliateProducts(affiliateId);
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.match.params.affiliateId !== prevProps.match.params.affiliateId
    ) {
      this.props.fetchAffiliateDetails(this.props.match.params.affiliateId);
    }
  }
  setCurrentTab = tab => {
    this.setState({
      currentTab: tab
    });
  };
  renderDashboard() {
    const { currentTab } = this.state;
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
            <p className="affiliate-not-found">
              Sorry, we could not find this company.
            </p>
          </div>
        );
      default:
        return (
          <div className="container dashboard-page">
            <div className="dashboard-sidebar">
              <span className="sidebar-section-header">Account</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(0)}
                className={`sidebar-link ${
                  currentTab === 0 ? "active" : undefined
                }`}
              >
                Profile
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(1)}
                className={`sidebar-link ${
                  currentTab === 1 ? "active" : undefined
                }`}
              >
                Billing
              </a>
              <span className="sidebar-section-header">Setup</span>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(2)}
                className={`sidebar-link ${
                  currentTab === 2 ? "active" : undefined
                }`}
              >
                Products
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(3)}
                className={`sidebar-link ${
                  currentTab === 3 ? "active" : undefined
                }`}
              >
                Offers
              </a>
              <span className="sidebar-section-header">Analytics</span>

              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(4)}
                className={`sidebar-link ${
                  currentTab === 4 ? "active" : undefined
                }`}
              >
                Products
              </a>
              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(5)}
                className={`sidebar-link ${
                  currentTab === 5 ? "active" : undefined
                }`}
              >
                Offers
              </a>
              <span className="sidebar-section-header">Support</span>

              <a
                href="javascript:;"
                onClick={() => this.setCurrentTab(6)}
                className={`sidebar-link ${
                  currentTab === 6 ? "active" : undefined
                }`}
              >
                Contact
              </a>
            </div>
            <div className="dashboard-wrapper">
              {currentTab === 0 && (
                <div className="dashboard-panel">
                  <Profile affiliate={this.props.affiliate} />
                </div>
              )}
              {currentTab === 2 && (
                <div className="dashboard-panel">
                  <AddProducts affiliate={this.props.affiliate} />
                  <AffiliateProducts products={this.props.affiliateProducts} />
                </div>
              )}
            </div>
          </div>
        );
    }
  }

  render() {
    const { auth } = this.props;
    if (this.props.match.params.affiliateId) {
      return this.renderDashboard();
    } else {
      return (
        <div className="choose-affiliate-wrapper">
          <div className="choose-affiliate-panel">
            <div className="choose-affiliate-header-wrapper">
              <h3 className="choose-affiliate-header">Choose a store</h3>
            </div>
            {auth &&
              auth.companies.map(function(company, key) {
                return (
                  <Link
                    key={key}
                    className="link-wrapper"
                    to={"/dashboard/" + company._id}
                  >
                    <div className="affiliate-avatar-wrapper">
                      <div className="affiliate-avatar">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                    </div>

                    <span className="affiliate-link-name">
                      {company.companyName}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ auth, affiliate, affiliateProducts }) {
  return { auth, affiliate, affiliateProducts };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Dashboard)
);
