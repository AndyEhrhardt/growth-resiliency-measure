import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [role, setRole] = useState(true);
  const [school, setSchool] = useState('');

  const errors = useSelector((store) => store.errors);
  const distAndSchool = useSelector((store) => store.districtSchool);

  console.log(distAndSchool)


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
  }, [dispatch]);

  const registerUser = (event) => {
    event.preventDefault();
    console.log(username, password, firstName, lastInitial, role, school);
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastInitial: lastInitial,
        role: role ? 2 : 3,
        school: school,
      },
    });
  }; // end registerUser
  const handleRadio = (tOrF) => {
    console.log(tOrF);
    setRole(tOrF);
  }
  const handleSchool = (event) =>{
    console.log(event.target.value)
    setSchool(event.target.value);
  }




  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
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
      </div>
      <div>
        <TextField
          type="password"
          name="password"
          required
          variant="standard"
          label="password"
          id="standard-basic"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <TextField
          type="first name"
          name="firstName"
          required
          variant="standard"
          label="First Name"
          id="standard-basic"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <TextField
          type="lastInitial"
          name="lastInitial"
          required
          variant="standard"
          label="Last Initial"
          id="standard-basic"
          value={lastInitial}
          onChange={(event) => setLastInitial(event.target.value)}
        />
      </div>
      <RadioGroup row aria-label="role" name="row-radio-buttons-group">
        <FormControlLabel onClick={() => handleRadio(true)} checked={role} control={<Radio />} label="Teacher" />
        <FormControlLabel onClick={() => handleRadio(false)}  checked={!role} control={<Radio />} label="Admin" />
      </RadioGroup>
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">School</InputLabel>
        <Select
          value={school}
          label="school"
          onChange={(event) => handleSchool(event)}
        >
          {distAndSchool.length === 0 ? <>loading </> : distAndSchool.map((school) => (
            <MenuItem key={school.school_id} value={school.school_id}>{school.school_name}</MenuItem>        
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onHover={"contained"}
        onClick={(event) => registerUser(event)}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
