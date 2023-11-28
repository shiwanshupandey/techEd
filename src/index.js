import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.js';
// import reportWebVitals from './reportWebVitals';
import { AppProvider } from './components/context/productcontext';
import { FilterContextProvider } from "./components/context/filter_context";
import { CartProvider } from './components/context/cart_context';
import { ToastContainer } from 'react-toastify';
// Import necessary FontAwesome components and icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


library.add(fas);



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppProvider>
    <FilterContextProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </FilterContextProvider>
    <ToastContainer />
  </AppProvider>
);

// reportWebVitals();





