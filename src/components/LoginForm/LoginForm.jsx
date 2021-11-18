import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Typography
        sx={{ fontWeight: 400, fontSize: 40, fontFamily: "roboto", paddingBottom: .5}}
      >
        Login
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
          type="text"
          name="username"
          required
          value={username}
          variant="standard"
          label="email"
          id="standard-basic"
          onChange={(event) => setUsername(event.target.value)}
        />
        </label>
      </div>
      <br/>
      <div>
        <label htmlFor="password">
          <TextField
          type="password"
          name="password"
          required
          variant="standard"
          label="password"
          id="standard-basic"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{paddingBottom: 2}}
          />
        </label>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          onHover={"contained"}
          sx={{ height: 40, width: 110 }}
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
