import React from "react";
import ProdBlock from "./ProdBlock";
import logo1 from "../assets/images/amazon-logo.png";
import logo2 from "../assets/images/bestbuy-logo.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import product1 from "../assets/images/headphone.jpg";
import product2 from "../assets/images/tv.jpg";
import product3 from "../assets/images/shoes.jpg";
import product4 from "../assets/images/phone.jpg";
import product5 from "../assets/images/ps4.jpg";
import product6 from "../assets/images/vacuum.jpg";
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.timer = this.timer.bind(this);
  }
  async componentDidMount() {
    this.props.fetchWatchlist();
  }

  render() {
    const { watchlist } = this.props;
    console.log(watchlist)
    return (
      <div className="container wishlist-page">
        <div className="wishlist-wrapper">
          <div className="prod-row-wrapper">
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
            <div className="prod-row">
            
              {watchlist &&
                watchlist.map(function(product, key) {
                  
                 return  <ProdBlock
                 key={key}

                    showDetailsLink={true}
                    prodImg={product.image_url}
                    special={true}
                    priceDrop={true}
                  />;
                })}
            </div>
          </div>
          <hr />
          <div className="prod-row-wrapper">
            <div className="prod-row-header">
              <div className="prod-row-logo-wrapper">
                <div className="prod-row-logo">
                  {/* <h3 className="logo-text">Best Buy</h3>*/}
                  <img className="logo" src={logo2} alt="Amazon logo" />
                </div>
                <div className="prod-row-stats">
                  <p className="product-count">6 products</p>
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
              <ProdBlock
                showDetailsLink={true}
                prodImg={product6}
                special={true}
                priceDrop={true}
              />
              <ProdBlock showDetailsLink={true} prodImg={product4} />
              <ProdBlock showDetailsLink={true} prodImg={product2} />
              <ProdBlock
                showDetailsLink={true}
                prodImg={product1}
                priceDrop={true}
              />
              <ProdBlock
                showDetailsLink={true}
                prodImg={product3}
                special={true}
                priceDrop={true}
              />
              <ProdBlock
                showDetailsLink={true}
                prodImg={product5}
                special={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ watchlist }) {
  return { watchlist };
}
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Wishlist)
);
