import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="innerNav">
      <Link to="/home">
      <Typography
        sx={{ maxHeight: 50, fontWeight: 400, fontSize: 30, fontFamily: "roboto", paddingBottom: .5, paddingLeft: 2, color: 'black'}}
      >
        Growth Resiliency Measure
      </Typography>
      </Link>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <div className="navigation-links">

            {user.role_id === 3 &&
            <>
            <Link className="navLink" to="/access">
              Manage Access
            </Link>
            <Link className="navLink" to="/SchoolDistrict">
              Manage Schools/Districts
            </Link>
            <Link className="navLink" to="/OverviewCharts">
              Overview Charts
            </Link>
            </>
            } 
            <Link className="navLink" to="/studentList">
              Student List
            </Link>
            <LogOutButton className="navLink" />
          </div>
        )}
        </div>
    </div>
  );
}

export default Nav;
