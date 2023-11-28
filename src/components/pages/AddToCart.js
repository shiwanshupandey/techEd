import { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id} = product ;

  if (!product || !_id) {
    return <div>No product data available.</div>;
  }

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetchUserData(token);
    }

    axios
      .get("http://localhost:5000/purchases/")
      .then((response) => {
        setPurchases(response.data);
  })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

  const fetchUserData = (token) => {
    axios
      .post("http://localhost:5000/users/userData", { token })
      .then((response) => {
        const { status, data } = response.data;

        if (status === "ok") {
          setUserData(data);
          // console.log(data);
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

  // const productId = product._id;
  // console.log(productId)


  // Check if the user has purchased this product
  const hasPurchased = () => {
    if (userData && userData._id) {
      for (const purchase of purchases) {
        if (
          purchase.user._id === userData._id &&
          purchase.products.some((p) => p._id === product._id)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const handleAddToCart = () => {
    // Set loading state to true when adding to the cart
    setLoading(true);
    
    addToCart(_id, product);

    // Simulate an API call or delay to show loading state
    setTimeout(() => {
      // Set loading state back to false once the operation is completed
      setLoading(false);
    }, 1000); // Adjust the delay as needed
  };

  return (
    <Wrapper>
      {hasPurchased() ? (
        <div>You have already purchased this product.</div>
      ) : (
        <Link to="/cart" onClick={handleAddToCart}>
          <Button className={`btns ${loading ? "loading" : ""}`}>
            {loading ? "Adding to Cart..." : "Add To Cart"}
          </Button>
        </Link>
      )}
    </Wrapper>
  );
};



const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
    }
  }
`;
export default AddToCart;