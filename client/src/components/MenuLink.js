

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from "react-router-dom";

class MenuLink extends React.Component {
    constructor() {
      super();
   
      this.onClick = this.onClick.bind(this);
    }
   
    onClick(e) {
      if (this.props.hasSubMenu) this.props.toggleSubMenu(e);
      else {

   
        this.props.activateMe({
          newLocation: this.props.to,
          selectedMenuLabel: this.props.label,
        });
      }
    }
   
    render() {
      return (
          <li className="metismenu-item">
        <Link className={`metismenu-link ${this.props.active ? "active" : ""}`} to={this.props.to}>
        <i className={`metismenu-icon ${this.props.icon}`}> </i>

          {this.props.label}
        </Link>
        </li>
      );
    }
  };
  export default MenuLink;
