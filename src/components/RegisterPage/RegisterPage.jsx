import React from 'react';
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          variant="contained"
          onHover={"contained"}
          onClick={() => {
            history.push('/login');
          }}
          sx={{ height: 30, width: 75 }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
