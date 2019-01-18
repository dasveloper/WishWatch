import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

class Billing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { affiliateStore } = this.props;
    return (
      <div className="form-wrapper profile-form-wrapper">
        <div className="form-header-wrapper">
          <h3 className="form-header">Billing</h3>
        </div>
        <div className="form-subheader-wrapper">
          <p className="form-subheader">
            There will be no billing for early access. You will be notified in advance before any changes in regards to billing comes into affect.
          </p>

        </div>
      </div>
    );
  }
}
export default Billing;
