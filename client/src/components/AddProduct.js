import React from "react";
import ProdBlock from "./ProdBlock";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
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
  async componentDidMount() {
    let productId = this.props.match.params.productId;
    if (productId) {
      this.props.fetchProduct(productId);
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.match.params.productId !== prevProps.match.params.productId
    ) {
      this.props.fetchProduct(this.props.match.params.productId);
    }
  }
  componentWillUnmount() {}
  addProductToWishlist(){
      this.props.addToWishlist(this.props.product._id, this.props.history);
  }
  renderAddProductBlock() {
    const { image_url, name } = this.props.product;
   return <div className="prod-row-wrapper">
      <div className="prod-row-header">
        <div className="prod-row-logo-wrapper">
          <div className="prod-row-logo">
            <img className="logo" src={logo1} alt="Amazon logo" />
          </div>
          <div className="prod-item-name-wrapper">
            <p className="prod-item-name">
              {name}
            </p>
          </div>
        </div>
      </div>
      <div className="prod-img-wrapper">
        <img className="prod-img" src={image_url} alt="product image" />
      </div>
      <div className="prod-atw-wrapper">
        <p className="prod-atw-text">Add this product to your wishlist?</p>
      </div>
      <div className="prod-atw-button-wrapper">
        <button onClick={()=> this.addProductToWishlist()} className="prod-atw-button">
          Add to WishWatch
        </button>
        <a className="prod-atw-no-thanks">No thanks</a>
      </div>
    </div>;
  }
  render() {
    const { product } = this.props;
    return (
      <div className="container add-page">
        <div className="add-wrapper">
          {product && this.renderAddProductBlock()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ product }) {
  return { product };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(AddProduct)
);
