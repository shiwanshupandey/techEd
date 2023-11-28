import React,{ useEffect, useState, useContext } from 'react'
import styled from "styled-components";
import ProfilePopup from './header/ProfilePopup';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import profile from "../assests/profile.jpg"
import UserContext from '../components/context/userContext';

function User () {
    const {userData} = useContext(UserContext);
//   const[user, setUser] = useState({});
  

//   function handleCallbackResponse(response){
//     console.log("encoded JWt id token:" + response.credential);
//     const userObject = jwt_decode(response.credential);
//     console.log(userObject); 
//     setUser(userObject);
//     document.getElementById("signInDiv").hidden = true;
// }

//   useEffect(()=>{
//     google.accounts.id.initialize({
//         client_id: "653517017388-9tm9rv64m3lbq095r2liubvj5pvhmbvh.apps.googleusercontent.com",
//         callback: handleCallbackResponse
//     })

//     google.accounts.id.renderButton(
//         document.getElementById("signInDiv"),
//         {theme: "outline", size: "small"}
//     );

//     google.accounts.id.prompt();
// }, []);

  return (
    <Wrapper className="section">
      <div class="container-xl px-4 mt-4">
        <hr class="mt-0 mb-4"/>
        { userData.user && 
        <div class="row">
        <div class="col-xl-4">
            
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">Profile Picture</div>
                <div class="card-body text-center">
                    
                    <img class="img-account-profile rounded-circle mb-2" src={profile} alt=""/>
                    
                    <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                   
                    <button class="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div class="col-xl-8">
           
            <div class="card mb-4">
                <div class="card-header">Account Details</div>
                <div class="card-body">
                    <form>
                        
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                            <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={userData.user.displayName}/>
                        </div>
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFirstName">first name</label>
                                <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={userData.user.displayName}/>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLastName">Last name</label>
                                <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={userData.user.displayName}/>
                            </div>
                        </div>
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputOrgName">Organization name</label>
                                <input class="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap"/>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLocation">Location</label>
                                <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location"/>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                            <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={userData.user.email}/>
                        </div>
                        
                        <div class="row gx-3 mb-3">
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567"/>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputBirthday">Birthday</label>
                                <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988"/>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
      }
    
</div>
    </Wrapper>
    
  );
};

const Wrapper = styled.section`
.img-account-profile {
    height: 10rem;
}
.rounded-circle {
    border-radius: 50% !important;
}
.card {
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
    font-weight: 500;
}
.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.form-control, .dataTable-input {
    display: block;
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c5ccd6;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.35rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.nav-borders .nav-link.active {
    color: #0061f2;
    border-bottom-color: #0061f2;
}
.nav-borders .nav-link {
    color: #69707a;
    border-bottom-width: 0.125rem;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0;
    padding-right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
}
`;

export default User
