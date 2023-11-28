import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import "./Login.css";
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import { GoogleLogin } from "react-google-login";

function Register () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [role, setUserType] = useState("");
  const [user, setUser] = useState({});
  const [secretKey, setSecretKey] = useState("");
  const { setUserData } = useContext(UserContext);
  const nav = useNavigate();



  const handleGoogleSuccess = (response) => {
    // Extract relevant user data from the Google response
    const { profileObj } = response;
    const { email, givenName, familyName } = profileObj;

    // Make an API call to your server with the extracted data
    sendGoogleUserDataToServer({ email, givenName, familyName });

    // Continue with your existing function to handle the response
    handleCallbackResponse(response);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    // You can show an error message or handle the failure as needed
  };

  const sendGoogleUserDataToServer = async (googleUserData) => {
    try {
      // Make an API call to your server to handle Google user data
      const response = await axios.post("http://localhost:5000/users/register", {
        googleUserData,
        // Additional data you may want to send to the server
      });

      // Handle the server response as needed
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending Google user data to server:", error);
      // Handle errors as needed
    }
  };


  const submit = async (e) => {
    e.preventDefault();

    if (role === "Admin" && secretKey !== "shiwanshu") {
      alert("Invalid Admin");
      return;
    }

    if (password !== passwordCheck) {
      setError("Passwords do not match.");
      return;
    }


    if (isGoogle) {
      // Handle Google registration
      // ...
    } else {
      // Handle regular registration
      // ...
    }

    try {
      const newUser = { email, password, passwordCheck, fullname, role };
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      setError(""); // Clear any previous errors
      nav("/");
    } catch (err) {
      if (err.response && err.response.data.msg) {
        // Show error in a toast notification
        toast.error(err.response.data.msg, {
          position: "top-right", // You can customize the position
          autoClose: 5000, // Time in milliseconds to auto-close the notification
        });
      } else {
        // Show a generic error message
        toast.error("An error occurred during registration.", {
          position: "top-right",
          autoClose: 5000,
        });
        console.error(err);
      }
    }
  };

  function handleCallbackResponse(response) {
    console.log("encoded JWT id token:" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    nav("/");
  }

    return ( 
        <div className="login-container">
            
            <h2 className="welcome-text">Register</h2>
            <form className="login-form" onSubmit={(e) => submit(e, false)}>
            <GoogleLogin
          clientId="653517017388-9tm9rv64m3lbq095r2liubvj5pvhmbvh.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={(response) => handleGoogleSuccess(response, true)}
          onFailure={handleGoogleFailure}
          cookiePolicy={"single_host_origin"}
          className="google-login-button"
        />
            <div class="radio-inputs">
            <label className="radio">
    <input type="radio" name="UserType" value="User" onChange={(e) => setUserType(e.target.value)}/>
    <span className="name">USER</span>
  </label>
  <label className="radio">
    <input type="radio" name="UserType" value="teacher" onChange={(e) => setUserType(e.target.value)}/>
    <span className="name">TEACHER</span>
  </label>
  <label className="radio">
    <input type="radio" name="UserType" value="Admin" onChange={(e) => setUserType(e.target.value)}/>
    <span className="name">ADMIN</span>
  </label>
      
                </div>
                {role=="Admin"? (<input type="secretkey" id="secretKey" placeholder="secret Key" className="input-field" onChange={e => setSecretKey(e.target.value)}/>): null}

                <input type="name" id="fullname" placeholder="full-Name" className="input-field" onChange={(e) => setFullname(e.target.value)}/>
                <input type="email" id="email" placeholder="Email" className="input-field" onChange={e => setEmail(e.target.value)}/>
 
                <input type="password" id="password" placeholder="Password" className="input-field" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" className="input-field" onChange={e => setPasswordCheck(e.target.value)}/>

                <input type="submit" value="Register" className="login-button" />
                <br></br>
                <Link to="/login">Already Registered</Link>
            </form>
            <ToastContainer />
        </div>
        );
}
 
export default Register;