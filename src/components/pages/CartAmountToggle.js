import React from "react";

const CartAmountToggle = ({ amount }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <div className="amount-style">{amount}</div>
      </div>
    </div>
  );
};

export default CartAmountToggle;