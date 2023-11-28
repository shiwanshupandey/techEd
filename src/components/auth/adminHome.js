import React, { Component, useEffect, useState } from "react";

const AdminHome = ({userData}) => {

  const [userData, setUserData] = useState(null); // To store user data

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {

      axios
        .post("http://localhost:5000/users/userData", { token })
        .then((response) => {
          const { status, data } = response.data;

          if (status === "ok") {
            // Set the user data in state
            setUserData(data);
          } else {
            // Handle errors (e.g., token expired or user not found)
            console.error("Error:", data);
          }
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
    }
  }, []);

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
      };

      if (userData.role !== 'Admin') {
        return <Redirect to="/" />;
      }
      return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              Email <h1>{userData.email}</h1>
              <br />
              <button onClick={logOut} className="btn btn-primary">
                Log Out
              </button>
            </div>
          </div>
        </div>
  )
}

export default AdminHome
