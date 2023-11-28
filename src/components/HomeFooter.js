import React, { useState, useEffect } from 'react';
import Footer from '../components/footer/footer';
import axios from 'axios';
import useUserData from './userData';

function HomeFooter() {
    const userData = useUserData();

  // If the userData is available and the user is an admin or teacher, return null to hide the header
  if (userData && (userData.role === 'Admin' || userData.role === 'teacher')) {
    return null;
  }
    return (
        <div>
            <Footer />
        </div>
    );
}

export default HomeFooter;