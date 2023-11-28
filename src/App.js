import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import HomeContent from "./components/HomeContent";
import HomeFooter from "./components/HomeFooter";
import Search from "./components/search/Search";
import Home from "./components/pages/Home";
import User from "./components/User";
import ProfilePopup from "./components/header/ProfilePopup";
import Dashboard from "./components/pages/Dashboard.js";
import SingleProduct from "./components/pages/SingleProduct";
import Products from "./components/Products.js";
import Settings from "./components/settings";
import Quiz from "./components/pages/Quiz";
import Category from "./components/pages/categories/Category";
import Cart from "./components/pages/Cart";
import ContactForm from "./components/pages/ContactForm";
import Notification from "./components/header/Notification";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserContext from "./components/context/userContext";
import axios from 'axios';
import UserDetails from "./components/auth/userDetails";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Admin from "./components/Admin/Admin";
import EditUser from"./components/Admin/edit-User";
import List from"./components/Admin/userList";
import CreateUsers from"./components/Admin/create-User";
import Create from "./components/Admin/createCourses";
import EditCourses from "./components/Admin/editCourses";
import ListCourses from "./components/Admin/listCourses";
import Teacher from "./components/Teacher/teacher";
import CreateNotification from "./components/Admin/create-Notification";
import EditNotification from "./components/Admin/editNotification";
import ListNotification from "./components/Admin/listNotification";
import Syllabus from "./components/pages/Syllabus";
import Profile from "./components/header/profile";
import CreateExam from "./components/Admin/create-exam";
import AssignmentListView from "./components/Admin/view-assignments";
import ListExam from "./components/Admin/listExam";
import TeacherListCourses from "./components/Teacher/teacherslistCourses";
import PurchasedList from "./components/Teacher/purchasedlist";
import ListPurchases from "./components/Admin/ListPurchases";
import ListReview from "./components/Admin/listReview";
import EditExam from "./components/Admin/editExam";
import AssignmentTeacher from "./components/Teacher/list-assignments";
import TeacherData from "./components/teacherData";
import ListAttendance from "./components/Admin/listAttentdance";
import CreateAttendance from "./components/Admin/create-Attendance";
import EditAttendance from "./components/Admin/editAttendance";
import MCQExam from "./components/pages/Exam";
import ListCategory from "./components/Admin/listCategory.js";
import EditCategory from "./components/Admin/editCategory.js";
import CreateCategory from "./components/Admin/create-category.js";
import ListTalk from "./components/Admin/listTalk.js";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
      <Header />
      {/* <ToastContainer /> */}
        <Routes>
          <Route path="/" element ={<HomeContent/>}/>
          <Route path="/search" element ={<Search/>}/>
          <Route path="/home" element ={<Home/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/profilepop" element={<ProfilePopup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}  />
          <Route path="/singleproduct/:_id/" element={<SingleProduct/>}/>
          <Route path="/syllabus/:_id" element={<Syllabus/>}/>
          <Route path="/settings" element={<Settings/>}/>
          {/* <Route path="/profile" /> */}
          <Route path="/category" element={<Category/>} />
          <Route path="/product" element={<Products/>}/>
          <Route path="quiz" element={<Quiz/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/contact" element={<ContactForm/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/userdetails" element={<UserDetails/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/List" element={<List/>}/>
          <Route path="/create-user" element={<CreateUsers/>}/>
          <Route path="/edit/:id" element={<EditUser/>}/>
          <Route path="/create-courses" element={<Create/>}/>
          <Route path="/courses-List" element={<ListCourses/>}/>
          <Route path="/edit-courses/:id" element={<EditCourses/>}/>
          <Route path="/teacher" element={<Teacher/>}  />
          <Route path="/create-notification" element={<CreateNotification/>}  />
          <Route path="/create-category" element={<CreateCategory/>}  />
          <Route path="/create-exam" element={<CreateExam/>}  />
          <Route path="/listexam" element={<ListExam />} />
          <Route path="/edit-notifcation/:id" element={<EditNotification/>}  />
          <Route path="/edit-category/:id" element={<EditCategory/>}  />
          <Route path="/edit-exam/:id" element={<EditExam/>}  />
          <Route path="/notificationlist" element={<ListNotification/>}  />
          <Route path="/categorylist" element={<ListCategory/>}  />
          <Route path="/notification" element={<Notification/>}  />
          <Route path="/view-assignments" element={<AssignmentListView/>}  />
          <Route path= "/teacherlistcourses" element={<TeacherListCourses/>}/>
          <Route path= "/purchasedlist" element={<PurchasedList/>}/>
          <Route path= "/listpurchases" element={<ListPurchases/>}/>
          <Route path= "/listtalk" element={<ListTalk/>}/>
          <Route path= "/listreview" element={<ListReview/>}/>
          <Route path= "/list-assignments" element={<AssignmentTeacher/>}/>
          <Route path= "/teacherdata" element={<TeacherData/>}/>
          <Route path= "/attendance" element={<ListAttendance/>}/>
          <Route path= "/create-attendance" element={<CreateAttendance/>}/>
          <Route path= "/edit-attendance/:id" element={<EditAttendance/>}/>
          <Route path= "/exam/:_id" element={<MCQExam/>}/>
        </Routes>
        <HomeFooter />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
