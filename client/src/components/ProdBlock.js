import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTag } from "@fortawesome/free-solid-svg-icons";
import { Button, ListGroupItem, ListGroup, Card, CardHeader, Row, Col } from "reactstrap";
import bg1 from "../assets/architect/utils/images/dropdown-header/abstract1.jpg";
import avatar1 from "../assets/architect/utils/images/avatars/1.jpg";

class ProdBlock extends React.Component {
  render() {
    return (

      <Card className=" profile-responsive prod-block-wrapper">
        
      <div className="prod-icon-row">
            {this.props.special && (
              <p className="prod-special-icon ">
                <FontAwesomeIcon icon={faTag} />
              </p>
            )}
            {this.props.priceDrop && (
              <p className="prod-price-icon">
                <FontAwesomeIcon className="foobar" icon={faDollarSign} />
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
    
      </Card>
    );
  }
}
export default ProdBlock;

{
  /* <div className="prod-block-wrapper">
        <div className="prod-block">
          <div className="prod-icon-row">
            {this.props.special && (
              <p className="prod-special-icon">
                <FontAwesomeIcon icon={faTag} />
              </p>
            )}
            {this.props.priceDrop && (
              <p className="prod-price-icon">
                <FontAwesomeIcon className="foobar" icon={faDollarSign} />
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
           {this.props.showDetailsLink &&<div className="prod-details-button">
            <button className="details-button">View details</button>
            
          </div>}
        </div>
      </div> */
}
