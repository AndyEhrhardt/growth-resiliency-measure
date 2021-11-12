import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import AddStudentModal from '../AddStudentModal/AddStudentModal'
import Button from "@mui/material/Button";
import StudentList from '../SudentList/StudentList'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [openAddStudent, setOpenAddStudent] = useState(false);

const handleAddStudentButtonClick = (event) => {
    event.preventDefault();
    setOpenAddStudent(true);
}


  return (
    <div className="container">
      <Button 
        onClick={(event) => handleAddStudentButtonClick(event)}
        variant="contained"
      >
        Add Student
      </Button>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <AddStudentModal openAddStudent={openAddStudent} setOpenAddStudent={setOpenAddStudent} />
      <StudentList /> 
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
