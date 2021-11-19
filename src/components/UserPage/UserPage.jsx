import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import StudentList from '../SudentList/StudentList'
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);



  

  return (
    <div className="container">
      <Typography
        sx={{ fontWeight: 400, fontSize: 30, fontFamily: "roboto", paddingBottom: .5}}
      >
        Welcome, {user.first_name} {user.last_initial}
      </Typography>
      <StudentList/> 
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
