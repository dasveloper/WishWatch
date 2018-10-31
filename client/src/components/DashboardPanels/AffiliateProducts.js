import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTimes,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";

import "react-confirm-alert/src/react-confirm-alert.css";

class AffiliateProducts extends React.Component {
    
  constructor(props) {
    super(props);
  }

  render() {
    let { products } = this.props;
    console.log(products)
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Product List</h3>
        </div>

        <ul>
      {products && products.map(function(product, key){
         return (<li key={key}>{product.name}</li>)
       })}
        </ul>
      </div>
    );
  }
}
export default AffiliateProducts;
