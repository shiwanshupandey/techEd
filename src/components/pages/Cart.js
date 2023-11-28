import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import CartItem from "../pages/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import FormatPrice from "../../Helper/FormatPrice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Cart = () => {
  const { cart, clearCart, total_price } = useCartContext();
  const [userData, setUserData] = useState(null);
  
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(true);



  const handleCheckout = () => {
    // Prepare the data to be sent to the server
    const products = cart.map((item) => item._id);
    const user = userData._id; 

    const checkoutData = {
      products : products,
      user,
    };
    console.log(checkoutData);

    // Make a POST request to your server's /purchase endpoint
    axios.post("http://localhost:5000/purchases/", checkoutData)
      .then((response) => {
        clearCart(); 
        toast.success("Purchase successful!");
      })
      .catch((error) => {
        console.error("Checkout error:", error);
        toast.error("Already Purchased");
        clearCart();
      });
  };



  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetchUserData(token);
      
    }

  }, []);

  const fetchUserData = (token) => {
    axios
      .post("http://localhost:5000/users/userData", { token })
      .then((response) => {
        const { status, data } = response.data;

        if (status === "ok") {
          setUserData(data);
          console.log(data);
        } else {
          console.error("Error:", data);
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };




  return (
    <Wrapper>
      {/* <ToastContainer /> */}
      <div className="container">
        <div className="cart-heading">
          <h2>Your Cart</h2>
        </div>
        <hr />
        {cart.length === 0 ? (
          <EmptyDiv>
            <h3>No Items in Cart</h3>
          </EmptyDiv>
        ) : (
          <>
            <div className="cart-item">
              {cart.map((curElem) => (
                <CartItem key={curElem._id} {...curElem} />
              ))}
              

            </div>
            <hr />
            <div className="cart-two-button">
              <NavLink to="/product">
                <Button>Continue Shopping</Button>
              </NavLink>
              <Button className="btn-clear" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="order-total--amount">
              <div className="order-total--subdata">
                <div>
                  <p>Subtotal:</p>
                  <p>
                    <FormatPrice price={total_price} />
                  </p>
                </div>
                <div>
                  <p>Order Total:</p>
                  <p>
                    <FormatPrice price={total_price} />
                  </p>
                </div>
              </div>
            </div>
            <button className="purchase-button" onClick={handleCheckout}>
  Complete Purchase
</button>
          </>
          
        )}
        
      </div>
    </Wrapper>
  );
};



const LoadingMessage = styled.div`


  text-align: center;
  /* Add any additional styles you want for the loading message */
`;

const EmptyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;

  h3 {
    font-size: 1.8rem;
    text-transform: capitalize;
    font-weight: 500;
  }
`;

const Wrapper = styled.section`

/* toastStyles.css */

/* Customize the container style */
.Toastify {
  font-family: Arial, sans-serif;
}

/* Customize the toast notification style */
.Toastify__toast {
  border-radius: 4px;
  margin: 8px;
  min-height: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Customize the success toast style */
.Toastify__toast--success {
  background-color: #4caf50;
}

/* Customize the error toast style */
.Toastify__toast--error {
  background-color: #f44336;
}


/* CSS for the "Complete Purchase" button */
button {
  background-color: #007bff; /* Set the background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Adjust padding as needed */
  border: none; /* Remove the border */
  border-radius: 5px; /* Add rounded corners */
  cursor: pointer; /* Add a pointer cursor on hover */
}

button:hover {
  background-color: #0056b3; /* Change background color on hover */
}


  padding: 5rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .cart-heading {
    text-align: center;
    text-transform: uppercase;

    h2 {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
    }
  }

  hr {
    margin-top: 1rem;
    border: none;
    border-top: 1px solid #ccc;
  }

  .cart-item {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .btn-clear {
      background-color: #e74c3c;
      color: #fff;
      padding: 10px 20px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c0392b;
      }
    }
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 1px solid #f0f0f0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    .cart-item {
      grid-template-columns: 1fr;
    }

    .cart-two-button {
      flex-direction: column;
      align-items: center;

      .btn-clear {
        margin-top: 1rem;
      }
    }
  }
};`

export default Cart;
