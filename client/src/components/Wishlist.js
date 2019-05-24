import React from "react";
import ProdBlock from "./ProdBlock";
import logo1 from "../assets/images/amazon-logo.png";
import logo2 from "../assets/images/bestbuy-logo.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, ListGroupItem, ListGroup, Card, Row, Col } from "reactstrap";
import bg1 from "../assets/architect/utils/images/dropdown-header/abstract1.jpg";
import avatar1 from "../assets/architect/utils/images/avatars/1.jpg";

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
                <div className="featured-offers">
                  <ul className="offers-list">
                    <li className="featured-offer-link-item">
                      <a className="featured-offer-link" href="javascript:;">
                        20% off entire order when making a purchase of $99 or
                        more
                      </a>
                    </li>
                    <li className="featured-offer-link-item">
                      <a className="featured-offer-link" href="javascript:;">
                        Free shipping on all orders until 9/22
                      </a>
                    </li>
                  </ul>
                </div>
                <Row>

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
                                  </Row>

                <Row>
                  {store.products
                    ? store.products.map(function(product, key) {
                        return (
                          <Col sm="12" lg="6" xl="4">
                            <Card className="mb-3 profile-responsive">
                              <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-dark">
                                  <div
                                    className="menu-header-image opacity-2"
                                    style={{
                                      backgroundImage: "url(" + product.image_url + ")"
                                    }}
                                  />
                                  <div className="menu-header-content btn-pane-right">
                                    <div className="avatar-icon-wrapper mr-3 avatar-icon-xl btn-hover-shine">
                                      <div className="avatar-icon rounded">
                                        <img src={product.image_url} alt="Avatar 5" />
                                      </div>
                                    </div>
                                    <div>
                                      <h5 className="menu-header-title">
                                        Jeff Walberg
                                      </h5>
                                      <h6 className="menu-header-subtitle">
                                        Lead UX Developer
                                      </h6>
                                    </div>
                                    <div className="menu-header-btn-pane">
                                      <Button color="success">
                                        View Profile
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ListGroup flush>
                                <ListGroupItem>
                                  <div className="widget-content pt-1 pb-1 pl-0 pr-0">
                                    <div className="text-center">
                                      <h6 className="mt-3">
                                        <span className="pr-2">
                                          <b className="text-danger">12</b> new offers
                                        </span>
         
                                      </h6>
                                    </div>
                                  </div>
                                </ListGroupItem>
                                <ListGroupItem className="p-0">
                                  <div className="grid-menu grid-menu-2col">
                                    <Row className="no-gutters">
                                      <Col sm="6">
                                        <Button
                                          className="btn-icon-vertical btn-square btn-transition br-bl"
                                          outline
                                          color="link"
                                        >
                                          <i className="lnr-license btn-icon-wrapper btn-icon-lg mb-3">
                                            {" "}
                                          </i>
                                          View Profile
                                        </Button>
                                      </Col>
                                      <Col sm="6">
                                        <Button
                                          className="btn-icon-vertical btn-square btn-transition br-br"
                                          outline
                                          color="link"
                                        >
                                          <i className="lnr-music-note btn-icon-wrapper btn-icon-lg mb-3">
                                            {" "}
                                          </i>
                                          Leads Generated
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                </ListGroupItem>
                              </ListGroup>
                            </Card>
                          </Col>
                        );
                      })
                    : undefined //add no products state
                  }
                </Row>
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
