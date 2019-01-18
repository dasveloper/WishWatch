import React from "react";
import Profile from "./DashboardPanels/Profile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class CreateStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      website: "",
      phone: "",
      email: "",
      errors: undefined,
      submitSuccess: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({
      errors: undefined,
      email: event.target.value
    });
  }
  handleNameChange(event) {
    this.setState({
      errors: undefined,
      name: event.target.value
    });
  }
  handleWebsiteChange(event) {
    this.setState({
      errors: undefined,
      website: event.target.value
    });
  }
  handlePhoneChange(event) {
    this.setState({
      errors: undefined,
      phone: event.target.value
    });
  }
  handleProfileSubmit(event) {
    event.preventDefault();
    let databody = {
      name: this.state.name,
      website: this.state.website,
      phone: this.state.phone,
      email: this.state.email
    };
    fetch("/store/create", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          let path = `dashboard/${data.store.id}`;
          this.props.history.push(path);
        } else {
          this.setState({
            submitSuccess: data.success,
            errors: data.errors
          });
        }
      });
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {
      errors,
      submitSuccess,
      name,
      website,
      phone,
      email
    } = this.state;
    return (
      <div className="container create-store-page">
        <div className="create-store-wrapper">
          <div className="create-store-panel">
            <div className="form-wrapper profile-form-wrapper">
              <div className="form-header-wrapper">
                <h3 className="form-header">Create store</h3>
              </div>
              <form
                className="form profile-form"
                onSubmit={this.handleProfileSubmit}
              >
                <label className="form-label">
                  Store Name
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Store Name"
                    type="text"
                    value={name}
                    onChange={this.handleNameChange}
                  />
                </label>
                <label className="form-label">
                  Store Website
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Store Website"
                    type="text"
                    value={website}
                    onChange={this.handleWebsiteChange}
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
                {errors &&
                  errors.map(function(error, key) {
                    return (
                      <p key={key} className="handler-response error">
                        {error}
                      </p>
                    );
                  })}
      

                <div className="form-submit-wrapper">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  {false && (
                    <button
                      type="button"
                      className="form-cancel-button"
                      onClick={() => this.props.history.goBack()}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    actions
  )(CreateStore)
);
