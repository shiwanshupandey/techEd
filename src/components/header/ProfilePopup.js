import React from 'react'
import "./ProfilePopup.css"
import { useEffect, useState,useContext } from "react";
import profile from "../../assests/profile.jpg"
import jwt_decode from "jwt-decode";
import { NavLink } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import ProfilePage from './profile';

function  ProfilePopup() {
  const {userData, setUserData} = useContext(UserContext);
  
  const login = () => nav("/login");

  const nav = useNavigate();

  const logout = () => {
    setUserData({
        token: undefined,
        user: undefined
    })
    localStorage.setItem("auth-token","");
    nav("/");
    window.location.reload(); 
};

  useEffect(() => {
    if(!userData.user)
        nav("/login");

}, []);

  
  
  return (
    <div>
      <div id= "signInDiv" onClick={() => "var t = this; t.disabled = true; setTimeout(function() {t.disabled = false;},2000);"}></div>
    { userData.user &&
      <div className="container py-5 ">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-12">
  <ul className="list-unstyled">
    <li className="dropdown ml-2">
								<span className="rounded-circle " href="./profile" role="button" id="dropdownUser"
									data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div className="avatar avatar-md avatar-indicators avatar-online">
										<img alt="avatar" src={profile} className="rounded-circle"/>
									</div>
								</span> 
				
								<div className="dropdown-menu pb-2" aria-labelledby="dropdownUser">
									<div className="dropdown-item">
										<div className="d-flex py-2">
											<div className="avatar avatar-md avatar-indicators avatar-online">
												<img alt="avatar" src={profile} className="rounded-circle"/>
											</div>
											<div className="ml-3 lh-1">
												<h5 className="mb-0">{userData.user.fullname}</h5>
                        <p className="mb-0">{userData.user.role}</p>
												<p className="mb-0">{userData.user.email}</p>
                        
											</div>
				
										</div>
										
									</div>
									<div className="dropdown-divider"></div>
									<div className="">
                  <ul className="list-unstyled">
  <li>
    <NavLink className="dropdown-item" to="/profile">
      <span className="mr-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </span>
      Profile
    </NavLink>
  </li>
  <li>
    <NavLink className="dropdown-item" to="/dashboard">
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
          </polygon>
        </svg>
      </span>
      Dashboard
    </NavLink>
  </li>
  {/* <li>
    <NavLink className="dropdown-item" to="/settings">
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </span>
      Settings
    </NavLink>
  </li> */}
  {/* <li>
    <NavLink className="dropdown-item" to="/quiz">
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </span>
      Quiz
    </NavLink>
  </li> */}
</ul>

									</div>
									<div className="dropdown-divider"></div>
                   {/* Object.keys(user).length != 0 &&   onClick={(e) => handleSignOut(e)}*/}
                   {userData.user ? (
  <ul className="list-unstyled">
    <li>
      <span className="dropdown-item" onClick={logout}>
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-power"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </span>
        Sign Out
      </span>
    </li>
  </ul>
) : (
  <>
    <button className="button-18" onClick={login}>
      Login
    </button>
  </>
)}

								</div>
						</li>
  </ul>
  
</div>
            
    </div>
     </div>
    }
    </div>
    
  )
}

export default ProfilePopup

