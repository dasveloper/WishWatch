import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";

import icon from "../assets/images/wand-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBell,
  faEnvelope,
  faUser
} from "@fortawesome/free-solid-svg-icons";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.openMenu = this.openMenu.bind(this);
  }
  openMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  renderAccountMenu() {
    return this.props.auth ? (
      <div
        className={`account-menu-dropdown ${
          this.state.menuOpen ? "open" : undefined
        }`}
      >
        <div className="account-menu-header">
          <p className="account-menu-user">Dasveloper</p>
          <p className="account-menu-store">WishWatch</p>
        </div>
        <div className="account-menu-item">
          <Link to={"/dashboard"} className="account-menu-item-link">
            Dashboard
          </Link>
        </div>
        <div className="account-menu-item">
          <a className="account-menu-item-link" href="javascript:;">
            Account
          </a>
        </div>
        <div className="account-menu-item">
          <a className="account-menu-item-link" href="javascript:;">
            Support
          </a>
        </div>
        <div className="account-menu-item">
          <a className="account-menu-item-link logout" href="/auth/logout">
            Logout
          </a>
        </div>
      </div>
    ) : (
      undefined
    );
  }
  renderHeaderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="nav-right">
            <div className="nav-login">
              <Link to={"/login"} className="sign-in">
                Sign In
              </Link>
              <Link to={"/signup"} className="sign-up">
                GET STARTED
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <div className="nav-right">
            <div className="nav-row   d-none d-sm-flex">
              <span className="notifications">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span className="notifications">
                <FontAwesomeIcon icon={faBell} />
              </span>
            </div>
            <div className="account">
              <a href="javscript:;" onClick={this.openMenu} className="avatar">
                <FontAwesomeIcon icon={faUser} />
              </a>
              <a
                href="javscript:;"
                onClick={this.openMenu}
                className={`avatar-toggle ${
                  this.state.menuOpen ? "open" : undefined
                }`}
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </a>
            </div>
          </div>
        );
    }
  }
  render() {
    return (
      <div className="nav">
        <Link to={this.props.auth ? "/dashboard" : "/"} className="nav-logo">
          <img alt="logo" className="nav-logo-img" src={icon} />
          WishWatch
        </Link>
        {this.renderHeaderContent()}
        {this.renderAccountMenu()}
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
  )(Header)
);
