import React from "react";
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTag } from "@fortawesome/free-solid-svg-icons";

class OfferDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOffer({ text, link, updatedAt }, key) {
    return (
      <div key={key} className="offer">
        <div className="offer-details">
          <p className="offer-text">{text}</p>
          <p className="offer-link">{link}</p>
        </div>
          <p className="offer-updated">
            updated <Moment fromNow>{updatedAt}</Moment>
          </p>
      </div>
    );
  }
  render() {
    let { sku, updatedAt, Offers } = this.props.product;
    return (
      <div className="offer-details-wrapper">
        <div className="offer-details-header">
          <p className="offer-sku">{`SKU: ${sku}`}</p>
          <p className="offer-updated">
            updated <Moment fromNow>{updatedAt}</Moment>
          </p>
        </div>
        <div className="offers">
          {Offers &&
            Offers.map((offer, key) => {
              return this.renderOffer(offer, key);
            })}
        </div>
      </div>
    );
  }
}
export default OfferDetails;
