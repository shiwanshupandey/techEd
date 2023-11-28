import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from "./ErrorNotice";
import "./Login.css";

function ResetPassword () {
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const {id, token} = useParams();

    const { setUserData } = useContext(UserContext);
    const nav = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {password,passwordCheck};
            const loginResponse = await axios.post(`http://localhost:5000/users/reset-password/${id}/${token}`, loginUser);
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
        <h1 className="welcome-text">Reset Password</h1>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form className="login-form" onSubmit={submit}>
            <input type="password" id="password" placeholder="Enter Password" className="input-field" onChange={e => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm password" className="input-field" onChange={e => setPasswordCheck(e.target.value)}/>
            <input type="submit" value="reset" className="login-button" />
            <br></br>
        </form>
   </div>
   

    );
}
 
export default ResetPassword;




