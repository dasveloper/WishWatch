import React, { Component } from "react";
import icon from "../assets/images/wand-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBell,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  render() {
    return (
      <div className="nav">
        <h1 className="nav-logo">
          <img alt="logo" className="nav-logo-img" src={icon} />
          WishWatch
        </h1>
        {false && (
          <div className="nav-right">
            <div className="nav-login">
              <a className="sign-in" href="javascript:;">
                SIGN IN
              </a>

              <a className="sign-up" href="javascript:;">
                GET STARTED
              </a>
            </div>
          </div>
        )}
        {true && (
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
              <span className="avatar" />
              <span className="avatar-toggle">
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
