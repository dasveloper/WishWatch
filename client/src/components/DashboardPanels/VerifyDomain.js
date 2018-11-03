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
    const { domainVerified, verifyDomain, affiliate } = this.props;
    switch (domainVerified) {
      case null:
        return <p> Checking verification</p>;
      case false:
        return (
          <button onClick={() => verifyDomain(affiliate._id)}>
            Verify Domain
          </button>
        );
      default:
        return <p>Domain successfully verified</p>;
    }
  }
  render() {
    const { domainVerified, verifyDomain } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Verify Domain</h3>
        </div>

        <div className="verification-wrapper">{this.renderVerification()}</div>
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
