import React from "react";
import "../../components/footer/footer.css";
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();


  function handleClick() {
    navigate("/contact");
  }

  function TeachOn() {
    navigate("/register");
  }

  function product() {
    navigate("/product");
  }
  return (
    <div className="footer">
      <div className="upperDiv">
        <div className="linksContainer">
          <div className="linksDiv linksDiv1">
            <p onClick={TeachOn}>Teach on TechED</p>
            <p>About us</p>
            <p onClick={handleClick}>Contact us</p>
          </div>
          <div className="linksDiv linksDiv2">
            <p>Careers</p>
            <p>Help and Support</p>
            <p> </p>
          </div>
          <div className="linksDiv linksDiv3">
            <p>Terms</p>
            <p>Privacy policy and cookie policy</p>
            <p onClick={product}>Featured courses</p>
            <p> </p>
          </div>
        </div>
        <div className="linksDiv linksDiv4"></div>
      </div>
      <div className="lowerDiv">
        <img src="../logo.jpg" className="udemyLogo" alt="logo"></img>
        <div className="copyrightDiv">
          <p>© 2023 TestSite</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
