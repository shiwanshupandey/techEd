import React,{ useState,useEffect  } from 'react';
import { Link } from "react-router-dom";
import "./teacher.css";
import axios from 'axios'; // Import Axios
import HomeContent from "../HomeContent";
import TeacherSidebar from './test';
import { faTachometerAlt, faBook, faClipboard, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import useUserData from '../userData';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const  userData  = useUserData();
  const nav = useNavigate();
  const [hasReloaded, setHasReloaded] = useState(false);

  useEffect(() => {
    // Create a function to check if the user is a teacher
    const isTeacher = () => {
      return userData && userData.role === 'teacher';
    };

    // Check if the user is a teacher and hasn't reloaded the page yet
    if (isTeacher() && !hasReloaded) {
      // Reload the page
      

      // Set hasReloaded to true to prevent further reloads
      setHasReloaded(true);
    }
  }, [userData, hasReloaded]);


  return(
    <div>
      <h5>welcome creator</h5>
    </div>
  )
 
}
export default Teacher
