import React, { useState, useEffect } from 'react';
import HeaderPopup from "../components/header/headerPopup";
import HeaderPrimary from '../components/header/headerPrimary';
import Cart from './cart/Cart';
import axios from 'axios';
import TeacherSidebar from './Teacher/test';
import { faTachometerAlt, faBook, faClipboard, faFileAlt, faUser, faBell,faCoffee,faEnvelope, faStar,faComment, faClock, faFolder } from '@fortawesome/free-solid-svg-icons';
import useUserData from './userData';


function Header() {

const userData = useUserData();

  const sidebarItems = [
    { text: ' Dashboard', icon: faTachometerAlt, path: '/teacher' },
    { text: ' Courses', icon: faBook, path: '/TeacherListCourses' },
    { text: ' Assignments', icon: faClipboard ,path: '/list-assignments' },
    { text: ' Exams', icon: faFileAlt, path: '/listexam' },
    { text: ' purchases', icon: faCoffee, path: '/purchasedlist' },
    { text: ' Attendance', icon: faClock ,path: '/attendance' },
    { text: ' profile', icon: faUser, path: '/profile' }
  ];

  const sidebarAdmin = [
    { text: ' Dashboard', icon: faTachometerAlt, path: '/admin' },
    { text: ' Courses', icon: faBook, path: '/courses-List' },
    { text: ' Notification', icon: faBell, path: '/notificationlist' },
    { text: ' Category', icon: faFolder, path: '/categorylist' },
    { text: ' Assignments', icon: faClipboard ,path:  '/view-assignments'},
    { text: ' Exams', icon: faFileAlt, path: '/listexam' },
    { text: ' purchases', icon: faCoffee, path: '/listpurchases' },
    { text: ' review', icon: faStar, path: '/listreview' },
    { text: ' Talk to us', icon: faComment, path: '/listtalk' },
    { text: ' users', icon: faEnvelope, path: '/list' },
    { text: ' profile', icon: faUser, path: '/profile' },
  ];


  if (userData && (userData.role === 'teacher')) {
    return (
        <div>
            <TeacherSidebar items={sidebarItems}></TeacherSidebar>
        </div>
    );
  }

  if (userData && (userData.role === 'Admin')) {
    return (
        <div>
            <TeacherSidebar items={sidebarAdmin}></TeacherSidebar>
        </div>
    );
  }

  return (
    <div>
      <HeaderPopup />
      <HeaderPrimary /> 
    </div>
  );
}

export default Header;
