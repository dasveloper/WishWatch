import React from "react";
import ProdBlockMockup from "./ProdBlockMockup";
import EmailMockup from "./EmailMockup";
import BrowserMockup from "./BrowserMockup";
import StatsMockup from "./StatsMockup";
import EmailModal from "./EmailModal";

import ReactFullpage from "@fullpage/react-fullpage";
import icon from "../assets/images/wand-icon.svg";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      browserLoaded: false,
      emailLoaded: false,
      prodLoaded: false,
      statsLoaded: false,
      modalIsOpen: false,
      email: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  afterLoad(origin, destination, direction) {
    switch (destination.index) {
      case 0:
        setTimeout(() => {
          this.setState({ browserLoaded: true });
        }, 200);
        break;
      case 1:
        this.setState({ prodLoaded: true });

        break;
      case 2:
        this.setState({ statsLoaded: true });

        break;
      case 3:
        this.setState({ emailLoaded: true });
        break;
      default:
        break;
    }
    // arguments are mapped in order of fullpage.js callback arguments
    // do something with the event
  }

  render() {
    let {
      emailLoaded,
      browserLoaded,
      statsLoaded,
      prodLoaded,
      modalIsOpen
    } = this.state;

    return (
      <ReactFullpage
        afterLoad={this.afterLoad.bind(this)}
        recordHistory={false}
        // responsiveWidth={960}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper" className="landing">
              <EmailModal
                modalIsOpen={modalIsOpen}
                closeModal={this.closeModal}
              />
              <div className="section fp-auto-height-responsive">
                <div className="section-row landing-main">
                  <div className="section-column">
                    <div className="on-board">
                      <h1 className="on-board-logo">
                        <img
                          alt="wishwatch icon"
                          className="logo-img"
                          src={icon}
                        />
                        WishWatch
                      </h1>
                      <h2 className="headline d-none d-sm-block">
                        <span className="no-break">What your customers </span> <span className="no-break"> are wishing for</span>
                      </h2>
                      <p className="subhead">
                        Easy to integrate wishlist platform to attract, convert,
                        and retain customers.
                      </p>
                      <button onClick={this.openModal} className="join">
                        Add WishWatch to your website
                      </button>
                    </div>
                  </div>
                  <div className="section-column">
                  <p className="call-to-action">Add WishWatch to any product page</p>
                    <BrowserMockup loaded={browserLoaded} />
                  </div>
                </div>
              </div>
              <div className="section fp-auto-height-responsive">
                <div className="section-row">
                  <div className="section-column">
                    <h2 className="section-header">
                      Engage customers directly
                    </h2>
                    <h4 className="section-subheader">
                      WishWatch monitors price changes and allows affiliates to
                      advertise specials offers and promotions directly to a
                      customer's dashboard. This helps to convert prospective
                      customers from watchers to buyers.
                    </h4>
                  </div>
                  <div className="section-column prod-mockup-column">
                    <ProdBlockMockup loaded={prodLoaded} />
                  </div>
                </div>
              </div>

              <div className="section fp-auto-height-responsive">
                <div className="section-row">
                  <div className="section-column">
                    <h2 className="section-header">In-depth analytics</h2>
                    <h4 className="section-subheader">
                      WishWatch autmatically crunches all of your product and
                      customer data to provide affiliates with valuable insights
                      as to which products and offers are converting well.
                    </h4>
                  </div>
                  <div className="section-column stats-mockup-column">
                    <StatsMockup loaded={statsLoaded} />
                  </div>
                </div>
              </div>
              <div className="section fp-auto-height-responsive">
                <div className="section-row">
                  <div className="section-column">
                    <h2 className="section-header">WishWatch email list</h2>
                    <h4 className="section-subheader">
                      WishWatch affiliate products are automatically added to
                      weekly email blasts updating customer on any price changes
                      or promotions for the products they are watching. This
                      helps reduce churn and bring the customer back to your
                      site.
                    </h4>
                  </div>
                  <div className="section-column email-mockup-column">
                    <EmailMockup loaded={emailLoaded} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }
}
export default Landing;
