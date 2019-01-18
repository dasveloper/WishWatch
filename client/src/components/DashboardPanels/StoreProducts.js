import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ProductDetails from "../ProductDetails";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

import "react-confirm-alert/src/react-confirm-alert.css";


class StoreProducts extends React.Component {
  
  render() {

    let { products, affiliateStore } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Product List</h3>
        </div>
        <div className="prod-list-stats">
          <div className="prod-list-stat-block">
            <label className="form-label">
              Products
              <p className="form-item">{products ? products.length : 0}</p>
            </label>
          </div>
          <div className="prod-list-stat-block">
            <label className="form-label">
              Version
              <p className="form-item">{affiliateStore.prodListVersion}</p>
            </label>
          </div>
          <div className="prod-list-stat-block">
            <label className="form-label">
              Last updated
              <p className="form-item">
                <Moment fromNow>{affiliateStore.prodListUpdated}</Moment>
              </p>
            </label>
          </div>
        </div>
        {!products ||
          (!products.length && (
            <label className="form-label">
              <p className="form-item">No products found</p>
            </label>
          ))}



        {products &&
          products.map(function(product, key) {
            return <ProductDetails key={key} product={product} />;
          })}
      </div>
    );
  }
}
export default StoreProducts;
