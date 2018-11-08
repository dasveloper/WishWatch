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
    const {verifyDomain, affiliate } = this.props;
    switch (affiliate.verified) {
      case null:
        return           <label className="form-label">
        Verification status
        <p className="form-item">Checking verification...</p>
      </label>;
      case false:
        return (
          <button className ="btn btn-primary" onClick={() => verifyDomain(affiliate._id)}>
            Verify Domain
          </button>
        );
      default:
        return (
          <label className="form-label">
            Verification status
            <p className="form-item">Domain successfully verified</p>
          </label>
        );
    }
  }
  render() {
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
function mapStateToProps({ auth, affiliate }) {
  return { auth, affiliate };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(VerifyDomain)
);
