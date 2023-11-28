
import React, { useEffect, useState, useMemo } from "react";
// import AdminHome from "./adminHome";
import HomeContent from "../HomeContent";
import TeacherHome from "./teacherHome";
import { useNavigate } from "react-router";
import Admin from "../Admin/Admin";
import Teacher from "../Teacher/teacher";
import axios from "axios";

export default function UserDetails() {

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

  if (!userData) {
    return <div>Loading...</div>;
  } else if (userData.role === "Admin") {
    // return <AdminHome userData={userData} />;
    return <Admin/>
  } else if (userData.role === "teacher") {
    return <Teacher/>;
  } else {
    return <HomeContent />;
  }

}


