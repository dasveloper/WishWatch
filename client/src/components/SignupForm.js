import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./Forms/FormField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }
  renderFields() {
    return (
      <div>
        <Field
          component={FormField}
          className="form-input"
          name="email"
          type="text"
          label="Email"
          placeholder="Email"
        />
        <Field
          component={FormField}
          className="form-input"
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Field
          component={FormField}
          className="form-input"
          label="Confirrm password"
          name="confirm-password"
          type="password"
          placeholder="Confirm password"
        />
      </div>
    );
  }
  onSignupSubmit() {
    const { formValues, signupUser, history } = this.props;

    return signupUser(formValues, history);
  }
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Sign up</h3>
        </div>
        <form
          className="form profile-form"
          onSubmit={handleSubmit(this.onSignupSubmit)}
        >
          {this.renderFields()}
          {error && (
            <p className={`handler-response error`}>{error}</p>
          )}
          <div className="form-submit-wrapper">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <Link className="form-cancel-button" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!values.email) {
    errors.email = "You must provide an email";
  }
  if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "You must provide a password";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "You must confirm your password";
  }
  if (values.password != values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}
function mapStateToProps({ form }) {
  return {  formValues: form.signupForm.values };
}
SignupForm = withRouter(
  connect(
    mapStateToProps,
    actions
  )(SignupForm)
);
export default reduxForm({ validate, form: "signupForm" })(SignupForm);
