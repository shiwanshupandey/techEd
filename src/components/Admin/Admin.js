import React,{ useState,useEffect  } from 'react';
import { Link } from "react-router-dom";
import HomeContent from "../HomeContent";
import "./Admin.css"
import axios from 'axios'; 
import Sidebar from './sidebar';



const Admin = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {

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
        });
    }
  }, []);

  if (userData && userData.role === 'Admin') {

  return (
    
    <div className="admin-container">
      <Sidebar />
        {/* <nav className="main-nav">
          <ul>
            <li><Link to="/create-user">Create Users</Link></li>
            <li><Link to="/create-courses">Create Courses</Link></li>
            <li><Link to="/create-notification">Create Notification</Link></li>
            <li><Link to="/List">All Users</Link></li>
            <li><Link to="/courses-List">All Courses</Link></li>
            <li><Link to="/notificationlist">All Notifications</Link></li>
            <li><Link to="/create-exam">Create Exam</Link></li>
            <li><Link to="/view-assignments">View Assignments</Link></li>
          </ul>
        </nav> */}
        <h5>welcome Admin</h5>
      </div>
  );
  }else{
    return <HomeContent />;
  }
};

export default Admin

