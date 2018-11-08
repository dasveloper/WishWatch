import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import { withRouter } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  auth,
  exact,
  strict,
  path,
  ...rest
}) => (
  <Route
  exact={exact}
  strict={strict}
  path={path}
    {...rest}
    render={props => {
      if (auth === null) return <p></p>;
      return auth  === false? (
        <Redirect to="/login" />

      ) : (
        <Component props={props}/>

      );
    }}
  />
);

const mapStateToProps = ({ auth }) => ({
  auth
});
export default withRouter(connect(mapStateToProps)(PrivateRoute));
