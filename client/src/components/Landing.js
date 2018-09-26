import React, { Component } from "react";
import LandingHeader from "./LandingHeader";
import icon from "../assets/wand-icon.svg";

import product1 from "../assets/prod1.png";
import product2 from "../assets/prod2.png";
import star from "../assets/star.png";
import starempty from "../assets/star-empty.png";
import affiliateDash from "../assets/affiliatedash.png";
import heroProdImage1 from "../assets/photo_camera_1.svg";
import heroProdImage2 from "../assets/watch.svg";
import heroProdImage3 from "../assets/computer.svg";

const heroImages = [
  { imageSrc: heroProdImage1, color: "#00B14F" },
  { imageSrc: heroProdImage2, color: "#FF3D1E" },
  { imageSrc: heroProdImage3, color: "#781EA7" }
];

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroImageIndex: 0,
      heroImage: heroImages[0],
      intervalId: null
    };
    this.timer = this.timer.bind(this);
  }
   shadeColor = (color, percent) => {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
  componentDidMount() {
    var intervalId = setInterval(this.timer, 2000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    let newHeroImage =
      this.state.heroImageIndex == heroImages.length - 1
        ? 0
        : this.state.heroImageIndex + 1;
    // setState method is used to update the state
    this.setState({
      heroImageIndex: newHeroImage,
      heroImage: heroImages[newHeroImage]
    });
  }
  render() {
    let { heroImageIndex, heroImage } = this.state;
    let { imageSrc, color } = heroImage;

    return (
      <div className="landing">
        <div style={{ backgroundColor: this.shadeColor(color, 30) }} className="landing-main">
          <LandingHeader />
          <div className="hero-wrapper">
            {false && (
              <div className="on-board">
                <input className="email" placeholder="Email" />
                <button className="subscribe">Subscribe</button>
              </div>
            )}
            <div className="browser">
              <div className="browser-header">
                <div className="browser-button red" />
                <div className="browser-button yellow" />
                <div className="browser-button green" />
              </div>
              <h4 className="prod-page-header">Easily add to any product page</h4>
              <div className="main">
                <div className="main-left">
                  <div style={{ backgroundColor: color }} className="hero">
                    <img src={imageSrc} />
                  </div>
                  <div className="wrapper">
                    <span className="beacon" />
                    <span className="beacon" />
                    <span className="beacon" />
                    <span className="beacon" />
                    <span className="beacon blink">
                      <img src={icon} />
                    </span>
                  </div>
                </div>
                <div className="main-right">
                  <div className="prod-name" />
                  <div className="sub-title" />
                  <div className="text-line" />
                  <div className="text-line" />
                  <div className="text-line" />
                  <div className="column-wrapper">
                    <div className="left-column">
                      <div className="text-line" />
                      <div className="text-line" />
                      <div className="text-line" />
                    </div>
                    <div className="right-column" />
                  </div>
                  <div className="buyButton" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="feature">
          <h2 className="feature-header">Customer Dashboard</h2>
          <h4 className="feature-subheader">
            The customer dashboard will provide direct access to their favorite
            products linking directly back to your site, reducing churn an
            increasing conversion.
          </h4>
          <div className="customer-dashboard">
            <div className="product-wrapper">
              <img className="prod-image" src={product2} />
            </div>
            <div className="product-wrapper">
              <img className="prod-image" src={product1} />
            </div>
          </div>
        </div>
        <div class="feature">
          <h2 className="feature-header">Affiliate Dashboard</h2>
          <h4 class="feature-subheader">
            View customer analytics to see which products are performing the
            best as well as push promotions to incentivize purchases.
          </h4>
          <div className="affiliate-dashboard">
            <img className="affiliate-dash" src={affiliateDash} />
          </div>
        </div>
        <div class="feature">
          <h2 className="feature-header">Product Integration</h2>
          <h4 class="feature-subheader">
            Manually upload products or integrate with our easy set-up product
            feed to keep customers up to date with product prices.
          </h4>

          <div className="product-feed">
            <pre>{`[
  {
    productId: "5748206",
    productTitle: "Sony 65" Class - LED - X850E Series - 2160p - Smart - 4K UHD TV with HDR",
    productPrice: 1099.99,
    priceLocalization: "USD"   
  },
  {
    productId: "6296207",
    productTitle: "Bose QuietComfort 35 Wireless Headphones II",
    productPrice: 349.99,
    priceLocalization: "USD"   
  }
]
`}</pre>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
