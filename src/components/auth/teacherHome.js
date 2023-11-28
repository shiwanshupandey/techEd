import React, { Component, useEffect, useState } from "react";

const TeacherHome = ({userData}) => {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
      };
      return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              teachers-Name<h1></h1>
              Email <h1></h1>
              <br />
              <button onClick={logOut} className="btn btn-primary">
                Log Out
              </button>
            </div>
          </div>
        </div>
  )
}

export default TeacherHome
