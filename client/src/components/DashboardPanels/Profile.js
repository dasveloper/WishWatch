import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliateId: this.props.affiliate._id,
      companyName: this.props.affiliate.companyName,
      pendingCompanyName: "",
      companyWebsite: this.props.affiliate.companyWebsite,
      pendingCompanyWebsite: "",
      phone: this.props.affiliate.phone,
      pendingPhone: "",
      email: this.props.affiliate.email,
      pendingEmail: "",
      editMode: false,
      handlerResponse: undefined,
      submitSuccess: false
    };
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleCompanyWebsiteChange = this.handleCompanyWebsiteChange.bind(
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
                      pendingCompanyName: "",
                      pendingCompanyWebsite: "",
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
        pendingCompanyName: this.state.companyName,
        pendingCompanyWebsite: this.state.companyWebsite,
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
  handleCompanyNameChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingCompanyName: event.target.value
    });
  }
  handleCompanyWebsiteChange(event) {
    this.setState({
      handlerResponse: undefined,
      pendingCompanyWebsite: event.target.value
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
    console.log(this.state.affiliateId);
    let databody = {
      affiliateId: this.state.affiliateId,
      companyName: this.state.pendingCompanyName,
      companyWebsite: this.state.pendingCompanyWebsite,
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
        console.log(data);
        this.setState({
          submitSuccess: data.success,
          handlerResponse: data.message
        });
        if (data.success) {
          this.setState({
            companyName: this.state.pendingCompanyName,
            companyWebsite: this.state.pendingCompanyWebsite,
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
      companyName,
      companyWebsite,
      phone,
      email
    } = this.state;

    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Company details</h3>
          <button className="form-edit-button" onClick={this.toggleEditMode}>
            Edit
          </button>
        </div>
        <form className="form profile-form" onSubmit={this.handleProfileSubmit}>
          <label className="form-label">
            Company Name
            {!editMode && (
              <p
                className={`form-item ${companyName || "not-set"}`}
              >{`${companyName || "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Company Name"
                type="text"
                value={this.state.pendingCompanyName}
                onChange={this.handleCompanyNameChange}
              />
            )}
          </label>
          <label className="form-label">
            Company Website
            {!editMode && (
              <p
                className={`form-item ${companyWebsite || "not-set"}`}
              >{`${companyWebsite || "Not set"}`}</p>
            )}
            {editMode && (
              <input
                className="form-input"
                type="text"
                placeholder="Company Website"
                type="text"
                value={this.state.pendingCompanyWebsite}
                onChange={this.handleCompanyWebsiteChange}
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
          )}
        </form>
      </div>
    );
  }
}
export default Profile;
