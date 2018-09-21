import React, { Component } from "react";
import icon from '../assets/wand-icon.svg';

class Header extends Component {
  render() {
    return     <h1 className="logo">  <img className="logo-img" src={icon} />
   </h1>

  }
}

export default Header;