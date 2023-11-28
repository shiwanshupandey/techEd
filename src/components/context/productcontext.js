import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
var cors = require('cors');



const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";
// const API = "https://retoolapi.dev/w73x6Y/products";
// const API = "https://api.npoint.io/4fc50d0b0e9ca275a9a6";
const API = "https://hostapi-production-ff8b.up.railway.app/api/products";
// const API = "http://localhost:5000/products/get";
// const API = "http://localhost:3060/api/products";
// const API = "localhost:6050/api/products/";


const initialState = {
  isLoading: false,
  isError: false,
  Products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
  boughtProducts: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const Products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: Products.Products});
      // console.log("~file: getProduct",Products.Products);
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct.Products});
      // console.log("~file:- getSingleProduct",singleProduct.Products);
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };