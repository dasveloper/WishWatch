import React from "react";
import ProdBlock from "./ProdBlock";
import logo1 from "../assets/images/amazon-logo.png";
import logo2 from "../assets/images/bestbuy-logo.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
 
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.timer = this.timer.bind(this);
  }
  async componentDidMount() {
    this.props.fetchWishlist();
  }
  renderWishlistProducts() {
    const { products } = this.props.wishlist;
    let sortedProducts = products.reduce((r, e) => {
      let store = e.store.id;
      if (!r[store]) r[store] = { store, products: [e] };
      else r[store].products.push(e);
      return r;
    }, {});

    let stores = Object.values(sortedProducts);
    return stores
      ? stores.map(function(store, key) {
          return (
            <div key={key}>
              <div  className="prod-row-wrapper">
                <div className="prod-row-header">
                  <div className="prod-row-logo-wrapper">
                    <div className="prod-row-logo">
                      <img className="logo" src={logo1} alt="Amazon logo" />
                    </div>
                    <div className="prod-row-stats">
                      <p className="product-count">3 products</p>
                    </div>
                  </div>
                </div>
                <div className="featured-offers">
              <ul className="offers-list">
                <li className="featured-offer-link-item">
                  <a className="featured-offer-link" href="javascript:;">
                    20% off entire order when making a purchase of $99 or more
                  </a>
                </li>
                <li className="featured-offer-link-item">
                  <a className="featured-offer-link" href="javascript:;">
                    Free shipping on all orders until 9/22
                  </a>
                </li>
              </ul>
            </div>
                <div className="prod-row">
                  {store.products
                    ? store.products.map(function(product, key) {
                        return (
                          <ProdBlock
                            key={key}
                            showDetailsLink={true}
                            prodImg={product.image_url}
                            special={true}
                            priceDrop={true}
                          />
                        );
                      })
                    : undefined //add no products state
                  }
                </div>
              </div>
              <hr />
            </div>
          );
        })
      : undefined; //add no store states
  }
  render() {
    const { wishlist } = this.props;
    const { products } = wishlist;
    return (
      <div className="container wishlist-page">
        <div className="wishlist-wrapper">
          {products && this.renderWishlistProducts()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ wishlist }) {
  return { wishlist };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Wishlist)
);
