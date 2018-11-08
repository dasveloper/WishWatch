import React from "react";
import Moment from 'react-moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTag } from "@fortawesome/free-solid-svg-icons";

class ProductDetails extends React.Component {
  render() {
    let { image_url, name, price, sku ,updated} = this.props.product;
    return (
      <div className="product-details-wrapper">
        {image_url && (
          <div className="product-image-wrapper">
            <img className="product-image" alt="product mockup" src={image_url} />
          </div>
        )}
        <div className="product-details">
          <p className="product-name">{name}</p>
          <p className="product-sku">{`SKU: ${sku}`}</p>
        </div>
        <div className="product-updated-wrapper">
        

        <p className="product-updated">updated <Moment fromNow>{updated}</Moment></p>
          </div>
      </div>
    );
  }
}
export default ProductDetails;
