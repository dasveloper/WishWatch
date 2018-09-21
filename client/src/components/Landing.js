import React from "react";
import LandingHeader from "./LandingHeader";
import product1 from "../assets/prod1.png";
import product2 from "../assets/prod2.png";
import star from "../assets/star.png";
import starempty from "../assets/star-empty.png";
import affiliateDash from "../assets/affiliatedash.png";

const Landing = () => {
  return (
    <div className="landing">
      <LandingHeader />
      <div class="feature">
        <h2 className="feature-header">Customer Dashboard</h2>
        <h4 class="feature-subheader">
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
          View customer analytics to see which products are performing the best
          as well as push promotions to incentivize purchases.
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
};
export default Landing;
