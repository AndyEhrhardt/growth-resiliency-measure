import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          variant="contained"
          onHover={"contained"}
          onClick={() => {
            history.push('/registration');
          }}
          sx={{ height: 30, width: 85 }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
