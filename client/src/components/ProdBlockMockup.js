import React from "react";
import ProdBlock from "./ProdBlock";
import product1 from "../assets/images/headphone.jpg";
import product2 from "../assets/images/tv.jpg";
import product3 from "../assets/images/shoes.jpg";
import product4 from "../assets/images/phone.jpg";
import product5 from "../assets/images/ps4.jpg";
import product6 from "../assets/images/vacuum.jpg";

const ProdBlockMockups = (props) => {
  return (
    <div className={`prod-block-grid ${props.loaded ? "loaded" : ""}`}>
        <div className="prod-block-grid-row first-row">
        <ProdBlock mockup={true} prodImg={product1} special={true}/>
        <ProdBlock mockup={true} prodImg={product2}/>
      </div>
      <div className="prod-block-grid-row second-row">
        <ProdBlock mockup={true} prodImg={product3}/>
        <ProdBlock mockup={true} prodImg={product4}priceDrop={true}/>
      </div>
      <div className="prod-block-grid-row third-row">
        <ProdBlock mockup={true} prodImg={product5} special={true} priceDrop={true}/>
        <ProdBlock mockup={true} prodImg={product6}/>

      </div>

    </div>
  );
};
export default ProdBlockMockups;
