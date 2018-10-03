import React, { Component } from "react";
import icon from "../assets/images/wand-icon.svg";

class Header extends Component {
  render() {
    return (
      <div className="nav">
        <h1 className="logo">
          <img alt="logo" className="logo-img" src={icon} />
          WishWatch
        </h1>
      </div>
    );
  }
}

export default Header;
