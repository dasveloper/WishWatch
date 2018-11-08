import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliateId: this.props.affiliate._id,
      storeName: this.props.affiliate.storeName,
      pendingStoreName: "",
      storeWebsite: this.props.affiliate.storeWebsite,
      pendingStoreWebsite: "",
      phone: this.props.affiliate.phone,
      pendingPhone: "",
      email: this.props.affiliate.email,
      pendingEmail: "",
      editMode: false,
      handlerResponse: undefined,
      submitSuccess: false
    };
    this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
    this.handleStoreWebsiteChange = this.handleStoreWebsiteChange.bind(
      this
    );
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
                      pendingStoreName: "",
                      pendingStoreWebsite: "",
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
        pendingStoreName: this.state.storeName,
        pendingStoreWebsite: this.state.storeWebsite,
        pendingEmail: this.state.email,
        pendingPhone: this.state.phone,
        editMode: !this.state.editMode
      });
    }
  }

  handleEmailChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingEmail: event.target.value
    });
  }
  handleStoreNameChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingStoreName: event.target.value
    });
  }
  handleStoreWebsiteChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingStoreWebsite: event.target.value
    });
  }
  handlePhoneChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingPhone: event.target.value
    });
  }
  handleProfileSubmit(event) {
    event.preventDefault();
    let databody = {
      affiliateId: this.state.affiliateId,
      storeName: this.state.pendingStoreName,
      storeWebsite: this.state.pendingStoreWebsite,
      phone: this.state.pendingPhone,
      email: this.state.pendingEmail
    };
    fetch("/affiliate/updateProfile", {
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
          this.setState({
            storeName: this.state.pendingStoreName,
            storeWebsite: this.state.pendingStoreWebsite,
            phone: this.state.pendingPhone,
            email: this.state.pendingEmail,
            editMode: false
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
      storeName,
      storeWebsite,
      phone,
      email
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
              <p
                className={`form-item ${storeName || "not-set"}`}
              >{`${storeName || "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Store Name"
                type="text"
                value={this.state.pendingStoreName}
                onChange={this.handleStoreNameChange}
              />
            )}
          </label>
          <label className="form-label">
            Store Website
            {!editMode && (
              <p
                className={`form-item ${storeWebsite || "not-set"}`}
              >{`${storeWebsite || "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Store Website"
                type="text"
                value={this.state.pendingStoreWebsite}
                onChange={this.handleStoreWebsiteChange}
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

          {handlerResponse && (
            <p
              className={`handler-response ${
                submitSuccess ? "success" : "error"
              }`}
            >
              {handlerResponse}
            </p>
          )}
          
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
