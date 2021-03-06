import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: this.props.affiliateStore.id,
      name: this.props.affiliateStore.name,
      pendingName: "",
      website: this.props.affiliateStore.website,
      pendingWebsite: "",
      phone: this.props.affiliateStore.phone,
      pendingPhone: "",
      email: this.props.affiliateStore.email,
      pendingEmail: "",
      editMode: false,
      handlerResponse: undefined,
      submitSuccess: false,
      errors: undefined,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);

    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }

  toggleEditMode() {
    if (this.state.editMode) {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to do this.",
        customUI: ({ onClose }) => {
          return (
            <div className="dialog-wrapper">
              <div className="dialog-header">
                <h1 className="dialog-header-text">Are you sure?</h1>
              </div>
              <div className="dialog-body">
                <p className="dialog-body-text">
                  Unsaved changes will be lost.
                </p>
              </div>
              <div className="dialog-buttons">
                <button className="dialog-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="dialog-primary"
                  onClick={() => {
                    this.setState({
                      pendingName: "",
                      pendingWebsite: "",
                      pendingPhone: "",
                      pendingEmail: "",
                      editMode: !this.state.editMode
                    });
                    onClose();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          );
        }
      });
    } else {
      this.setState({
        pendingName: this.state.name,
        pendingWebsite: this.state.website,
        pendingEmail: this.state.email,
        pendingPhone: this.state.phone,
        editMode: !this.state.editMode
      });
    }
  }

  handleEmailChange(event) {
    this.setState({
      handlerResponse: undefined,
      errors: undefined,

      pendingEmail: event.target.value
    });
  }
  handleNameChange(event) {
    this.setState({
      handlerResponse: undefined,
      errors: undefined,

      pendingName: event.target.value
    });
  }
  handleWebsiteChange(event) {
    this.setState({
      handlerResponse: undefined,
      errors: undefined,

      pendingWebsite: event.target.value
    });
  }
  handlePhoneChange(event) {
    this.setState({
      handlerResponse: undefined,
      errors: undefined,

      pendingPhone: event.target.value
    });
  }
  handleProfileSubmit(event) {
    event.preventDefault();
    let databody = {
      storeId: this.state.storeId,
      name: this.state.pendingName,
      website: this.state.pendingWebsite,
      phone: this.state.pendingPhone,
      email: this.state.pendingEmail
    };
    fetch("/store/update", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data.success) {
          this.setState({
            name: this.state.pendingName,
            website: this.state.pendingWebsite,
            phone: this.state.pendingPhone,
            email: this.state.pendingEmail,
            editMode: false,

          submitSuccess: data.success,
          handlerResponse: data.message
          });
        }
        else{
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
      handlerResponse,
      submitSuccess,
      editMode,
      name,
      website,
      phone,
      email,
      errors
    } = this.state;

    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Store details</h3>
          <button className="form-edit-button" onClick={this.toggleEditMode}>
            Edit
          </button>
        </div>
        <form className="form profile-form" onSubmit={this.handleProfileSubmit}>
          <label className="form-label">
            Store Name
            {!editMode && (
              <p className={`form-item ${name || "not-set"}`}>{`${name ||
                "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Store Name"
                type="text"
                value={this.state.pendingName}
                onChange={this.handleNameChange}
              />
            )}
          </label>
          <label className="form-label">
            Store Website
            {!editMode && (
              <p className={`form-item ${website || "not-set"}`}>{`${website ||
                "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Store Website"
                type="text"
                disabled
                value={this.state.pendingWebsite}
                onChange={this.handleWebsiteChange}
              />
            )}
          </label>
          <label className="form-label">
            Phone
            {!editMode && (
              <p className={`form-item ${phone || "not-set"}`}>{`${phone ||
                "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Phone"
                type="text"
                value={this.state.pendingPhone}
                onChange={this.handlePhoneChange}
              />
            )}
          </label>
          <label className="form-label">
            Email
            {!editMode && (
              <p className={`form-item ${email || "not-set"}`}>{`${email ||
                "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Email"
                type="text"
                value={this.state.pendingEmail}
                onChange={this.handleEmailChange}
              />
            )}
          </label>

          {handlerResponse &&
            !errors && (
              <p
                className={`handler-response ${
                  submitSuccess ? "success" : "error"
                }`}
              >
                {handlerResponse}
              </p>
            )}
          {errors &&
            errors.map(function(error, key) {
              return (
                <p key={key} className="handler-response error">
                  {error}
                </p>
              );
            })}

          {editMode && (
            <div className="form-submit-wrapper">
              <button type="submit" className="btn btn-primary">
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
          )}
        </form>
      </div>
    );
  }
}
export default Profile;
