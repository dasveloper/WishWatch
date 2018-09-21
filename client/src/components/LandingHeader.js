import React from "react";
import icon from '../assets/wand-icon.svg';

const LandingHeader = () => {
  return (
    <div className="hero-wrapper">
      <h2 className="subhead">
        Simple eCommerce wishlist platform to attract, convert, and retain
        customers
      </h2>
      <div className="main">
        <div className="main-left">
          <div className="hero" />
          <div className="wrapper">
            <span className="beacon" />
            <span className="beacon" />
            <span className="beacon" />
            <span className="beacon" />
            <span className="beacon blink">
              <img src={icon} />
            </span>
          </div>
        </div>
        <div className="main-right">
          <div className="prod-name" />
          <div className="sub-title" />
          <div className="text-line" />
          <div className="text-line" />
          <div className="text-line" />
          <div className="column-wrapper">
            <div className="left-column">
              <div className="text-line" />
              <div className="text-line" />
              <div className="text-line" />
            </div>
            <div className="right-column" />
          </div>
          <div className="buyButton" />
        </div>
      </div>
    </div>
  );
};
export default LandingHeader;
