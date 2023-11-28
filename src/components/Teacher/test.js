import React, { useState, useContext } from 'react';
import './TeacherSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, 
  faAngleRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import useUserData from '../userData';
import UserContext from '../context/userContext';
import ProfilePopup from '../header/ProfilePopup';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function TeacherSidebar({ items }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const userData = useUserData();
  const { userData, setUserData } = useContext(UserContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const nav = useNavigate();

  const register = () => nav("/register");
    const login = () => nav("/login");
    const logout = () => {
      setUserData({
          token: undefined,
          user: undefined
      })
      localStorage.setItem("auth-token","");
      nav("/");
      window.location.reload(); 
  };

  return (
    <div className={`teacher-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
      <ul className='kl'>
        {items.map((item) => (
          <Link to={item.path} key={item.text}>
            {/* Wrap with Link and provide 'to' prop */}
            <li className='il'>
              <FontAwesomeIcon icon={item.icon} />
              {isSidebarOpen ? <span className="icon-text">{item.text}</span> : null}
            </li>
          </Link>
        ))}
        {userData.user ? (
          <li className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
            {isSidebarOpen ? (
              <span className="icon-text" onClick={logout}>
                Logout
              </span>
            ) : null}
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default TeacherSidebar;
