import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import { Button } from "../styles/Button";
import "./Product.css"; // Import the CSS file
// import "./style.css";

const Product = (curElem) => {
  const { _id, name, image, price, category } = curElem;
  return (
    <NavLink to={`/singleproduct/${_id}`}>
      <div className="card">
        <figure>
          <img src={image} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3 className="h3" >{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price}/>}</p>
            <NavLink to={`/singleproduct/${_id}`} >
                  <button className="btn">Read More</button>
                </NavLink>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
