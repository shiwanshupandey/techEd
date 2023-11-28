import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const linkStyles = {
  textDecoration: "none",
  color: "white", // Set the text color to white
  flexGrow: 1,
};

const headerStyles = {
  margin: "16px 3px 20px 3px", 
};

const appBarStyles = {
  marginBottom: "20px",
  marginTop: "10px", // Add margin at the bottom
};



const Sidebar = ({ userData }) => {


  const isAdmin = userData && userData.role === 'Admin'; 

  return (
 <div>
      {isAdmin && (
        <AppBar position="static" style={appBarStyles}>
          <Toolbar>
            <Link to="/List" style={linkStyles}>
              <Typography variant="h8" component="div" align="center" style={headerStyles}>
                All Users
              </Typography>
            </Link>
            <Link to="/courses-List" style={linkStyles}>
              <Typography variant="h8" component="div" align="center" style={headerStyles}>
                All Course
              </Typography>
            </Link>
            <Link to="/notificationlist" style={linkStyles}>
              <Typography variant="h8" component="div" align="center" style={headerStyles}>
                All Notifications
              </Typography>
            </Link>

            <Link to="/listexam" style={linkStyles}>
              <Typography variant="h8" component="div" align="center" style={headerStyles}>
                All Exam
              </Typography>
            </Link>
            <Link to="/view-assignments" style={linkStyles}>
              <Typography variant="h8" component="div" align="center" style={headerStyles}>
                View Assignments
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Sidebar;
