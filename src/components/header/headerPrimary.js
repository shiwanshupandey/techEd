import React, {useState, useEffect, useContext} from "react";
import "../../components/header/headerPrimary.css";
import "../../components/header/Buttons.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {Link, useNavigate} from "react-router-dom";
import "@reach/menu-button/styles.css";
import "@reach/combobox/styles.css";
import "./button19.css";
import 'bootstrap/dist/css/bootstrap.css';
import {gapi} from 'gapi-script';
import ProfilePopup from "./ProfilePopup";
import { FiShoppingCart } from "react-icons/fi";
import UserContext from "../context/userContext";
import { useCartContext } from "../context/cart_context";
import { useFilterContext } from "../context/filter_context";

const clientId = "653517017388-9tm9rv64m3lbq095r2liubvj5pvhmbvh.apps.googleusercontent.com";

function HeaderPrimary() {

  const { userData, setUserData } = useContext(UserContext);
  const { total_item } = useCartContext();
  const { updateFilterValue, filters, all_products } = useFilterContext();
  const [searchResults, setSearchResults] = useState([]);
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
    }

    const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    updateFilterValue(e); // Update the filter context with the search text
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Filter products based on search text
    const filteredResults = all_products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  return (
      <div className="headerPrimary">
      <div className="left part">
        <div className="udemyLogo">
          <Link to = "/">
          <img src="../logo.jpg" className="logo" alt="logo"></img>
          </Link>
        </div>
        
        <div>
        <nav id="mainnav" className="mainnav">
                                <ul className="menu"> 
                                    <li className="home">
                                        <Link to = "/category"><span data-bs-auto-close="outside">Categories</span></Link>
                                        
                                    </li>
                                  </ul>
          </nav>

          
        </div>
      </div>
      
      <div className="right part">
        <div className="businessDiv">
          
          <Link to = "/product">
          <span className="icon">Courses</span>
          </Link>
        </div>
        <div className="cartDiv">
        <Link to="/cart" className="navbar-link cart-trolley--link">
              <ShoppingCartOutlinedIcon className="icon" />
              {total_item > 0 && (
              <span className="cart-item-count">{total_item}</span>
            )}
            </Link>
        </div>

        
        <div className="notifyDiv">
          <Link to = "/notification">
          <NotificationsNoneIcon className="icon" />
          </Link>
        </div>
          
          <div>
          {userData.user ?(
            <ProfilePopup></ProfilePopup>
          ):(
            <>
            <button className="button-18" onClick={login}>Login</button>
          <button className="button-18" onClick={register}>SignIn</button>
            </>
          )}
          
          </div>
      </div>
    </div>

      
  );
}

export default HeaderPrimary;
