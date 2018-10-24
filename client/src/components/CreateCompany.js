import React from "react";
import Profile from "./DashboardPanels/Profile";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions";

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      companyWebsite: "",
      phone: "",
      email: "",
      handlerResponse: undefined,
      submitSuccess: false
    };
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleCompanyWebsiteChange = this.handleCompanyWebsiteChange.bind(
      this
    );
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({
      handlerResponse: undefined,
      email: event.target.value
    });
  }
  handleCompanyNameChange(event) {
    this.setState({
      handlerResponse: undefined,
      companyName: event.target.value
    });
  }
  handleCompanyWebsiteChange(event) {
    this.setState({
      handlerResponse: undefined,
      companyWebsite: event.target.value
    });
  }
  handlePhoneChange(event) {
    this.setState({
      handlerResponse: undefined,
      phone: event.target.value
    });
  }
  handleProfileSubmit(event) {
    event.preventDefault();
    let databody = {
      companyName: this.state.companyName,
      companyWebsite: this.state.companyWebsite,
      phone: this.state.phone,
      email: this.state.email
    };
    fetch("/affiliate/createCompany", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          submitSuccess: data.success,
          handlerResponse: data.message
        });
        if (data.success) {
            console.log(data.affiliate)
            let path = `dashboard/${data.affiliate}`
            this.props.history.push(path);
        }
      });
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {
      handlerResponse,
      submitSuccess,
      companyName,
      companyWebsite,
      phone,
      email
    } = this.state;
    return (
      <div className="container create-company-page">
        <div className="create-company-wrapper">
          <div className="create-company-panel">
            <div className="form-wrapper profile-form-wrapper">
              <div className="form-header-wrapper">
                <h3 className="form-header">Create company</h3>
              </div>
              <form
                className="form profile-form"
                onSubmit={this.handleProfileSubmit}
              >
                <label className="form-label">
                  Company Name
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Company Name"
                    type="text"
                    value={companyName}
                    onChange={this.handleCompanyNameChange}
                  />
                </label>
                <label className="form-label">
                  Company Website
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Company Website"
                    type="text"
                    value={companyWebsite}
                    onChange={this.handleCompanyWebsiteChange}
                  />
                </label>
                <label className="form-label">
                  Phone
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Phone"
                    type="text"
                    value={phone}
                    onChange={this.handlePhoneChange}
                  />
                </label>
                <label className="form-label">
                  Email
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={this.handleEmailChange}
                  />
                </label>

                {handlerResponse && (
                  <p
                    className={`handler-response ${
                      submitSuccess ? "success" : "error"
                    }`}
                  >
                    {handlerResponse}
                  </p>
                )}

                <div className="form-submit-wrapper">
                  <button type="submit" className="form-submit-button">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="form-cancel-button"
                    onClick={this.toggleEditMode}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default  withRouter(connect(null, actions)(CreateCompany));
