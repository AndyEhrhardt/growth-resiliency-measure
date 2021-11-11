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



function AddStudentModal() {
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [role, setRole] = useState(true);
  const [school, setSchool] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [latinX, setLatinX] = useState(true);
  const [iep, setIep] = useState(true);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [clickedOnce2, setClickedOnce2] = useState(false);
  const [email, setEmail] = useState("");
  const errors = useSelector((store) => store.errors);
  const demographics = useSelector((store) => store.demographics);
  const [grade, setGrade] = useState("")
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
    dispatch({ type: 'FETCH_DEMOGRAPHICS' });
  }, [dispatch]);

  const addStudent = (event) => {
    event.preventDefault();
    console.log(firstName, lastInitial, role, school);
    dispatch({
      type: "POST_STUDENT",
      payload: {
        firstName: firstName,
        lastInitial: lastInitial,
        email: email,
        gender: gender,
        race: race,
        latinX: latinX,
        iep: iep,
        grade: grade,
      },
    });
  }; // end registerUser
  const handleHisp = (tOrF) => {
    console.log(tOrF)
    setClickedOnce(true);
    setLatinX(tOrF);
  }
  const handleIep = (tOrF) => {
    console.log(tOrF)
    setClickedOnce2(true);
    setIep(tOrF);
  }
  const handleSchool = (event) =>{
    console.log(event.target.value)
    setSchool(event.target.value);
  }
  const handleGenderSelection = (event) => {
    console.log(event.target.value)
    setGender(event.target.value);
  }

  const handleRaceSelection = (event) => {
    console.log(event.target.value)
    setRace(event.target.value);
  }
  const handleGradeSelection = (event) => {
    console.log(event.target.value)
    setGrade(event.target.value);
  }

  return (
    <form className="formPanel" onSubmit={addStudent}>
      <h2>Add Student</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
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
      <br/>
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
      <br/>
      <div>
        <TextField
          type="email"
          name="email"
          required
          variant="standard"
          label="Parent's Email"
          id="standard-basic"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <br/>
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="gender"
          onChange={(event) => handleGenderSelection(event)}
        >
          {demographics.gender.length === 0 ? <>loading </> : demographics.gender.map((gender) => (
            <MenuItem key={gender.id} value={gender.id}>{gender.name}</MenuItem>        
          ))}
        </Select>
      </FormControl>

      <br/>
      <br/>
      <FormControl fullWidth>
        <InputLabel>Race</InputLabel>
        <Select
          value={race}
          label="race"
          onChange={(event) => handleRaceSelection(event)}
        >
          {demographics.race.length === 0 ? <>loading </> : demographics.race.map((race) => (
            <MenuItem key={race.id} value={race.id}>{race.name}</MenuItem>        
          ))}
        </Select>
      </FormControl>
      <br/>
      <br/>
      <p>Does this student identify as Hispanic or Latino?</p>
      <RadioGroup row aria-label="role" name="row-radio-buttons-group">
        <FormControlLabel onClick={() => handleHisp(true)} checked={clickedOnce ? latinX : false} control={<Radio />} label="Yes" />
        <FormControlLabel onClick={() => handleHisp(false)}  checked={!latinX} control={<Radio />} label="No" />
      </RadioGroup>
      <p>Is this student on an Individualized Education Plan (IEP)?</p>
      <RadioGroup row aria-label="role" name="row-radio-buttons-group">
        <FormControlLabel onClick={() => handleIep(true)} checked={clickedOnce2 ? iep : false} control={<Radio />} label="Yes" />
        <FormControlLabel onClick={() => handleIep(false)}  checked={!iep} control={<Radio />} label="No" />
      </RadioGroup>
      <br/>
      <FormControl fullWidth>
        <InputLabel>Grade</InputLabel>
        <Select
          value={grade}
          label="Grade"
          onChange={(event) => handleGradeSelection(event)}
        >
            <MenuItem value={0}>Kindergarten</MenuItem>
            <MenuItem value={1}>1st</MenuItem>
            <MenuItem value={2}>2nd</MenuItem>
            <MenuItem value={3}>3rd</MenuItem>
            <MenuItem value={4}>4th</MenuItem>
            <MenuItem value={5}>5th</MenuItem>
            <MenuItem value={6}>6th</MenuItem>
            <MenuItem value={7}>7th</MenuItem>
            <MenuItem value={8}>8th</MenuItem>
            <MenuItem value={9}>9th</MenuItem>
            <MenuItem value={10}>10th</MenuItem>
            <MenuItem value={11}>11th</MenuItem>
            <MenuItem value={12}>12th</MenuItem>
        </Select>
      </FormControl>
      <br/>
      <br/>
      <Button
        variant="contained"
        onHover={"contained"}
        onClick={(event) => addStudent(event)}
      >
        Add Student
      </Button>
    </form>
  );
}

export default AddStudentModal;
