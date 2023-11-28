import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import "./Login.css";

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const nav = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            nav("/userdetails")
            window.location.reload();
        } catch(err) {
            if (err.response && err.response.data.msg) {
              setError(err.response.data.msg);
            } else {
              setError('An error occurred during login.');
              console.log(err);
            }
          }
        }
    return (
        <div className="login-container">
        <h1 className="welcome-text">Login</h1>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" id="email" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id="password" placeholder="Password" autoComplete="on" className="input-field" onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="Login" className="login-button" />
            <br></br>
            <Link to="/register">New Account</Link>
            <br></br>
            <br></br>
            <Link to="/forgot-password">Forgot Password</Link>
        </form>
   </div>

    );
}

 
export default Login;
