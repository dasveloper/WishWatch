import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTag } from "@fortawesome/free-solid-svg-icons";

class ProdBlock extends React.Component {
  render() {
    return (
      <div className="prod-block-wrapper">
        <div className="prod-block">
          <div className="prod-icon-row">
            {this.props.special && (
              <p className="prod-special-icon">
                <FontAwesomeIcon icon={faTag} />
              </p>
            )}
            {this.props.priceDrop && (
              <p className="prod-price-icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </p>
            )}
          </div>
          {this.props.prodImg && (
            <div className="prod-image-wrapper">
              <img
                className="prod-image"
                alt="product mockup"
                src={this.props.prodImg}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ProdBlock;
