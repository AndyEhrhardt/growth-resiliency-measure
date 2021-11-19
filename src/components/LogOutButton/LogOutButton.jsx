import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <LogoutIcon
      sx={{
        paddingTop: 1,
        paddingLeft: 1
      }}
      fontSize={'large'}
      onClick={() => dispatch({ type: 'LOGOUT' })} />
  );
}

export default LogOutButton;
