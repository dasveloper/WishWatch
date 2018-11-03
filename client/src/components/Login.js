import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  render() {
    return (
      <div className="container create-store-page">
        <div className="create-store-wrapper">
          <div className="create-store-panel">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Login)
);
