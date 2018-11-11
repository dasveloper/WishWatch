import React from "react";
import icon from "../assets/images/wand-icon.svg";
import Modal from "react-modal";


Modal.setAppElement("#root");
class EmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      modalIsOpen: false,
      emailHandlerResponse: undefined,
      submitSuccess: false
    };
    this.clearAndClose = this.clearAndClose.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({
      emailHandlerResponse: undefined,
      email: event.target.value
    });
  }
  handleEmailSubmit(event) {
    event.preventDefault();
    let databody = {
      email: this.state.email
    };
    fetch("/api/subscribe", {
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
          emailHandlerResponse: data.message
        });
        if (data.success) {
          this.setState({
            email: ""
          });
        }
      });
  }
  clearAndClose = () => {
    this.setState({ email: "", emailHandlerResponse: undefined });
    this.props.closeModal();
  };
  render() {
    let { emailHandlerResponse, submitSuccess } = this.state;
    let { modalIsOpen } = this.props;

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.clearAndClose}
        className="email-modal"
           overlayClassName="email-modal-overlay"
        contentLabel="Example Modal"
      >
        <div className="sign-up-modal-top">
          <div className="logo-row">
            <h1 className="sign-up-logo">
            <span className="sign-up-header">
              <img alt="WishWatch logo" className="logo-img" src={icon} />
              WishWatch</span>&nbsp;
              <span className="sign-up-subheader">early access</span>
            </h1>
          </div>

          <div className="sign-up-explanation-row">
            <p className="sign-up-explanation">
              WishWatch is currently under development. Sign up now to be
              notified when WishWatch is ready to be added to your site, as well
              as recieve valuable early access and promotions.
            </p>
          </div>
        </div>
        <form
          className="sign-up-modal-bottom"
          onSubmit={this.handleEmailSubmit}
        >
          <input
            className="email-input"
            type="text"
            placeholder="Email"
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          {emailHandlerResponse && (
            <p
              className={`email-handler-response ${
                submitSuccess ? "success" : "error"
              }`}
            >
              {emailHandlerResponse}
            </p>
          )}
          <button onClick={this.openModal} className="sign-up">
            Sign up
          </button>
          <button onClick={this.clearAndClose} className="cancel">
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}
export default EmailModal;
