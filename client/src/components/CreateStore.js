import React from "react";
import Profile from "./DashboardPanels/Profile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class CreateStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      storeWebsite: "",
      phone: "",
      email: "",
      handlerResponse: undefined,
      submitSuccess: false
    };
    this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
    this.handleStoreWebsiteChange = this.handleStoreWebsiteChange.bind(this);
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
  handleStoreNameChange(event) {
    this.setState({
      handlerResponse: undefined,
      storeName: event.target.value
    });
  }
  handleStoreWebsiteChange(event) {
    this.setState({
      handlerResponse: undefined,
      storeWebsite: event.target.value
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
      storeName: this.state.storeName,
      storeWebsite: this.state.storeWebsite,
      phone: this.state.phone,
      email: this.state.email
    };
    fetch("/affiliate/createStore", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          submitSuccess: data.success,
          handlerResponse: data.message
        });
        if (data.success) {
          console.log(data, data.store.id);
          let path = `dashboard/${data.store.id}`;
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
      storeName,
      storeWebsite,
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
                    value={storeName}
                    onChange={this.handleStoreNameChange}
                  />
                </label>
                <label className="form-label">
                  Store Website
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Store Website"
                    type="text"
                    value={storeWebsite}
                    onChange={this.handleStoreWebsiteChange}
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
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  {false && <button
                    type="button"
                    className="form-cancel-button"
                    onClick={() =>this.props.history.goBack()}
                  >
                    Cancel
                  </button>}
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
