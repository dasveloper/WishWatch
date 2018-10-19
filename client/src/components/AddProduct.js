import React from "react";
import ProdBlock from "./ProdBlock";
import logo1 from "../assets/images/amazon-logo.png";
import logo2 from "../assets/images/bestbuy-logo.png";

import product1 from "../assets/images/headphone.jpg";
import product2 from "../assets/images/tv.jpg";
import product3 from "../assets/images/shoes.jpg";
import product4 from "../assets/images/phone.jpg";
import product5 from "../assets/images/ps4.jpg";
import product6 from "../assets/images/vacuum.jpg";
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.timer = this.timer.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="container add-page">
        <div className="add-wrapper">
          <div className="prod-row-wrapper">
            <div className="prod-row-header">
              <div className="prod-row-logo-wrapper">
                <div className="prod-row-logo">
                  <img className="logo" src={logo1} alt="Amazon logo" />
                </div>
                <div className="prod-item-name-wrapper">
                  <p className="prod-item-name">
                    Bose&trade; Quiet Comfort headphones
                  </p>
                </div>
              </div>
            </div>
            <div className="prod-img-wrapper">
              <img className="prod-img" src={product1} alt="product image" />
            </div>
            <div className="prod-atw-wrapper">
              <p className="prod-atw-text">
                Add this product to your wishlist?
              </p>
            </div>
            <div className="prod-atw-button-wrapper">
              <a href="wishlist" className="prod-atw-button">Add to WishWatch</a>
              <a className="prod-atw-no-thanks">No thanks</a>
            </div>
          </div>
   
        </div>
      </div>
    );
  }
}
export default AddProduct;
