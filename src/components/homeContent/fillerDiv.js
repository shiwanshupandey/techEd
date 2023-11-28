import React from "react";
import "../../components/homeContent/fillerDiv.css";
import { Link } from "react-router-dom";

function FillerDiv() {
  return (
    <div className="fillerDiv">
      <div className="aboutFiller">
        <h2>Get learning recommendations</h2>
        <Link to="/category">
        <div className="getstartedButton">Get Started</div>
        </Link>
        
      </div>
    </div>
  );
}

export default FillerDiv;
