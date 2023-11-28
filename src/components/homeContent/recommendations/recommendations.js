import React from "react";
import "./recommendations.css";
// import RecommendedVideos from "./recommendedVideos";
import Product from "../../pages/Product";
import FeatureProduct from "./FeaturedProduct";

function Recommendations() {
  return (
    <div className="recommendationsDiv">
      <div className="recommendations">
        <h3>The world's largest selection of courses</h3>
        <p>
          Choose from 130,000 online video courses with new additions published
          every month
        </p>
        <h2>Students are viewing</h2>
        <FeatureProduct/>
        {/* <Product/> */}
        {/* <RecommendedVideos /> */}
      </div>
    </div>
  );
}

export default Recommendations;
