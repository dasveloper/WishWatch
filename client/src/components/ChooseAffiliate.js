import React from "react";
import Profile from "./DashboardPanels/Profile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import {Link} from 'react-router-dom';

class ChooseAffiliate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log(this.props.auth);

    let { auth } = this.props;
    return (
      <div className="container create-company-page">
        <div className="create-company-wrapper">
          <div className="create-company-panel">
            <div className="form-wrapper profile-form-wrapper">
              <div className="form-header-wrapper">
                <h3 className="form-header">Choose a store</h3>
              </div>
              {auth &&
                auth.companies.map(function(company, key) {
                  return (
                    <div key={key} className="link-wrapper">
                      <Link
                        to={"/dashboard/"+company._id}
                        className="nav-logo"
                      >
                        {company.companyName}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, affiliate, affiliateProducts }) {
  return { auth, affiliate, affiliateProducts };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(ChooseAffiliate)
);
