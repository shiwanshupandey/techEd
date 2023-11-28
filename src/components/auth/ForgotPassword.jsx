import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import "./Login.css";

function ForgotPassword () {
    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const nav = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email};
            const loginResponse = await axios.post("http://localhost:5000/users/forgot-password", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            nav("/login")
            // window.location.href = "./userDetails";
        } catch(err) {
            // Handle errors
            if (err.response && err.response.data.msg) {
              setError(err.response.data.msg);
            } else {
              setError('An error occurred during login.');
              console.log(err);
            }
          }
        
    };

    return (
        <div className="login-container">
        <h1 className="welcome-text">Forgot Password</h1>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form className="login-form" onSubmit={submit}>
            <input type="email" id="email" placeholder="Email" className="input-field" onChange={e => setEmail(e.target.value)}/>
            <input type="submit" value="send" className="login-button" />
            <br></br>
        </form>
   </div>
   

    );
}
 
export default ForgotPassword;




