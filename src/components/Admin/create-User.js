
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import ErrorNotice from '../auth/ErrorNotice';
import "../auth/Login.css";
import jwt_decode from 'jwt-decode';
import "./allCourses.css";


function CreateUsers () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [fullname, setfullname] = useState("");
    const [error, setError] = useState();
    const [role, setUserType] = useState("");
    const[user, setUser] = useState({});
    const [secretKey, setSecretKey] = useState("");

    const { setUserData } = useContext(UserContext);
    const nav = useNavigate();
    

    const submit = async (e) => {
        if(role=="Admin" && secretKey!="shiwanshu"){
            e.preventDefault();
            alert("invalid Admin");
        }
        else{
            e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, fullname, role};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            nav("/");
        } catch(err) {
            if (err.response && err.response.data.msg) {
              setError(err.response.data.msg);
            } else {
              setError('An error occurred during login.');
              console.log(err);
            }
          }
        }
        
        
    };

    function handleCallbackResponse(response){
        console.log("encoded JWt id token:" + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject); 
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        nav("/");
    }

    useEffect(()=>{
        google.accounts.id.initialize({
            client_id: "653517017388-9tm9rv64m3lbq095r2liubvj5pvhmbvh.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "small"}
        );

        google.accounts.id.prompt();
    }, []);

   
    return ( 
        <div className="login-container">

            <h2 className="welcome-text">Register</h2>
            <form className="login-form" onSubmit={submit}>
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
                {role=="Admin"? (<input type="text" id="secretKey" placeholder="secret Key" className="input-field" onChange={e => setSecretKey(e.target.value)}/>): null}

                <input type="name" id="name" placeholder="fullname" className="input-field" onChange={(e) => setfullname(e.target.value)}/>
                <input type="email" id="email" placeholder="Email" className="input-field" onChange={e => setEmail(e.target.value)}/>
                <input type="password" id="password" placeholder="Password" className="input-field" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" className="input-field" onChange={e => setPasswordCheck(e.target.value)}/>

                <input type="submit" value="Register" className="login-button" />
                <br></br>
                <Link to="/login">Already Registered</Link>
            </form>
        </div>
        );
}
 
export default CreateUsers;