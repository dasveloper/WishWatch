import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import dnsExample from "../../assets/images/dns-example.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid";
import "react-confirm-alert/src/react-confirm-alert.css";

class VerifyDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInstructions: false
    };
  }
  generateUUID() {
    return uuidv4();
  }
  toggleInstructions = () => {
    this.setState({ showInstructions: !this.state.showInstructions });
  };
  renderVerification() {
    const { verifyDomain, affiliateStore } = this.props;
    switch (affiliateStore.verified) {
      case null:
        return (
          <label className="form-label">
            Verification status
            <p className="form-item">Checking verification...</p>
          </label>
        );
      case false:
        return (
          <div>
            <p className="verify-domain-instructions">
              You must verify your domain to finish your account setup. Please
              follow the instuctions below to add a DNS TXT record to your
              domain.
            </p>
            <button
              className={`btn btn-collapse instructions-collapse-toggle ${
                this.state.showInstructions ? "open" : undefined
              }`}
              onClick={() => this.toggleInstructions()}
            >
              How to add TXT record{" "}
              <FontAwesomeIcon className="collapse-icon" icon={faChevronDown} />
            </button>
            <div
              className={`instructions-collapse ${
                this.state.showInstructions ? "open" : undefined
              }`}
            >
              <div className="instructions">
                <ol>
                  <li className="instruction">
                    Sign in to your domain host account and find your domain’s
                    DNS records (DNS Manager, DNS Control Pane, or Advanced DNS
                    editor).
                  </li>
                  <li className="instruction">
                    Select the option to add a new TXT record.
                  </li>
                  <li className="instruction">
                    In the Name/Hostname/Alias field, enter @ or leave it blank.
                  </li>
                  <li className="instruction">
                    In the Value/Answer/Destination field, paste your Wishwatch
                    verification key found below.
                  </li>
                  <li className="instruction">
                    In the Time to Live (TTL) field, leave the default.
                  </li>

                  <img
                    className="dns-example"
                    src={dnsExample}
                    alt="DNS example"
                  />
                  <li className="instruction">Save the record.</li>
                  <li className="instruction">
                    Return to this page and click the "Verify Domain" button
                    below.
                  </li>
                </ol>
                <p className="instruction-footnote">
                  TXT record changes can take up to 72 hours to go into effect,
                  but it usually happens much sooner. if you can't access your
                  domain's DNS records, contact your domain host directly for
                  assistance.
                </p>
              </div>
            </div>
            <label className="form-label">
              Verification key
              <p className="form-item verification-key">
                {affiliateStore.verificationCode}
              </p>
            </label>
            <button
              className="btn btn-primary"
              onClick={() => verifyDomain(affiliateStore.id)}
            >
              Verify Domain
            </button>
          </div>
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
function mapStateToProps({ auth, affiliateStore }) {
  return { auth, affiliateStore };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(VerifyDomain)
);
