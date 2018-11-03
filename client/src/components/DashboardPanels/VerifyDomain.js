import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

import "react-confirm-alert/src/react-confirm-alert.css";

class VerifyDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderVerification() {
    const { domainVerified, verifyDomain,affiliate } = this.props;
    switch (domainVerified) {
      case null:
        return (
          <div className="verification-wrapper">
            <p> Checking verification</p>
          </div>
        );
      case false:
        return (
          <div className="verification-wrapper">
            <button onClick={() => verifyDomain(affiliate._id)}>Verify Domain</button>
          </div>
        );
      default:
       return <div className="affiliate-not-found-wrapper">
          <p className="affiliate-not-found">Domain successfully verified</p>
        </div>;
    }
  }
  render() {
    const { domainVerified, verifyDomain } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Verify Domain</h3>
        </div>
        {this.renderVerification()}
      </div>
    );
  }
}
function mapStateToProps({ auth, affiliate, domainVerified }) {
  console.log(domainVerified);
  return { auth, affiliate, domainVerified };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(VerifyDomain)
);
