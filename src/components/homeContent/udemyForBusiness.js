import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../components/homeContent/udemyForBusiness.css";



function UdemyForBusiness() {
  const navigate = useNavigate();


  function handleClick() {
    navigate("/contact");
  }
  
  return (
    <div className="udemyForBusiness">
      <div className="backgroundColorDiv"></div>
      <div className="contentDiv">
        <h2 className="heading">TechED for Schools</h2>
        <p className="about">
          Get unlimited access to 4,000+ of Udemy's top courses for your Institute.
        </p>
        <div className="startTeching button" onClick={handleClick}>Get TechED for schools</div>
        </div>
      <img
        src="https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-ufb.jpg"
        alt="instructorImg"
        className="Img"
      ></img>
    </div>
  );
}

export default UdemyForBusiness;
