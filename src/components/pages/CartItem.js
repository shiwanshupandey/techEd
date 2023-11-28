import React, { useState, Link } from "react";
import FormatPrice from "../../Helper/FormatPrice";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import { NavLink } from "react-router-dom";


const CartItem = ({ _id, name, image, price, amount}) => {
  const { removeItem } = useCartContext();


  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
        <NavLink to={`/singleproduct/${_id}`} className="btn-main">
          <figure>
            <img src={image} alt={_id} />
          </figure>
          </NavLink>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
      {/* price   */}
      {/* <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div> */}
      
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(_id)} />
      </div>
    </div>
  );
};

export default CartItem;