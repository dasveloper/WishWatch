import React from "react";

const EmailMockup = props => {
  return (
    <div className={`email-wrapper ${props.loaded ? "loaded" : ""}`}>
      <div className="email-envelope-flap" />

      <div className="email-envelope">
        <div className="email">
          <p className="email-header">This weeks sales</p>
          <div className="email-promo-row">
            <div className="email-promo-image" />
            <div className="email-promo-info">
              <div className="email-promo-info-title" />
              <div className="email-promo-info-detail" />

              <div className="email-promo-info-detail" />

            </div>
          </div>
          <div className="email-promo-row">
            <div className="email-promo-image" />
            <div className="email-promo-info">
              <div className="email-promo-info-title" />
              <div className="email-promo-info-detail" />

              <div className="email-promo-info-detail" />

            </div>
          </div>
          <div className="email-promo-row">
            <div className="email-promo-image" />
            <div className="email-promo-info">
              <div className="email-promo-info-title" />
              <div className="email-promo-info-detail" />

              <div className="email-promo-info-detail" />

            </div>
          </div>
        </div>

        <div className="email-front" />
      </div>
    </div>
  );
};
export default EmailMockup;
