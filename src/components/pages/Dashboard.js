import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Admin from "../Admin/Admin";
import Teacher from "../Teacher/teacher";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import "./Dashboard.css";



export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetchUserData(token);
    }

    axios.get('http://localhost:5000/purchases/') // Replace with your backend API URL
      .then((response) => {
        setPurchases(response.data); // Assuming the response contains an array of purchases
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });
  }, []);

  const fetchUserData = (token) => {
    axios
      .post("http://localhost:5000/users/userData", { token })
      .then((response) => {
        const { status, data } = response.data;

        if (status === "ok") {
          setUserData(data);
        } else {
          console.error("Error:", data);
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      })
      .finally(() => {
        setLoading(false); // Hide loading indicator when data is available or on error
      });
  };

 
  

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  // Define components for different user roles
  const UserComponents = {
    Admin: <Admin />,
    teacher: <Teacher />,
  };


  // Assuming you have the user's ID in userData
const userId = userData ? userData._id : null;


// Filter the purchases to find purchases made by the logged-in user
// const userPurchases = purchases.filter((purchase) => purchase.user._id === userId);
const userPurchases = purchases.filter((purchase) => purchase.user && purchase.user._id === userId);
console.log(purchases);


const isAuthenticated = !!userData;

return (

<div>
  {isAuthenticated ? (
    UserComponents[userData.role] || (
      <div className="recommendationsDiv">
        <div className="recommendations">
          <h1 className="">Your Courses</h1>
          <p>Choose from 130,000 online video courses with new additions published every month</p>
          <NavLink to="/product">
            <p>explore more...</p>
          </NavLink>
          <div className="purchase-cards-container">
            <div className="purchase-cards">
              {userPurchases.length === 0 ? (
                <p>No courses bought</p>
              ) : (
                userPurchases.map((purchase) => (
                  <div key={purchase._id} className="purchase-card">
                    {purchase.products.map((product) => (
                      <div key={product._id} className="product-card">
                        <NavLink to={`/singleproduct/${product._id}`}>
                          <img
                            className="product_image"
                            src={product.image}
                            alt={product.name}
                          />
                          <div className="purchase-details">
                            <strong>Purchase Date:</strong>{" "}
                            {new Date(purchase.purchaseDate).toLocaleString()}
                          </div>
                          <div className="product-name">
                            <strong>Product Name:</strong> {product.name}
                          </div>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <div>
      <p>You are not authenticated. Please log in.</p>
      <NavLink to="/login">Login</NavLink>
    </div>
  )}
</div>

);
    }






