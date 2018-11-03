import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./Forms/FormField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
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
          //value={email}
          // onChange={this.handleEmailChange}
        />
        <Field
          component={FormField}
          className="form-input"
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          //value={password}
          //onChange={this.handlePasswordChange}
        />
      </div>
    );
  }
  onSubmit() {
    const { formValues, loginUser, handleSubmit, history } = this.props;

    loginUser(formValues, history);
  }
  render() {
    const { handleSubmit, fetchUserError } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Login</h3>
        </div>
        <form
          className="form profile-form"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          {this.renderFields()}
          {this.props.fetchUserError && (
            <p
              className={`handler-response error`}
            >
              {fetchUserError}
            </p>
          )}
          <div className="form-submit-wrapper">
            <button type="submit" className="form-submit-button">
              Submit
            </button>
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
  return errors;
}
function mapStateToProps({ form, fetchUserError }) {
  return { fetchUserError, formValues: form.surveyForm.values };
}
LoginForm = withRouter(
  connect(
    mapStateToProps,
    actions
  )(LoginForm)
);
export default reduxForm({ validate, form: "surveyForm" })(LoginForm);
