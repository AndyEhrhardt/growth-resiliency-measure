import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import addStudentStyles from './addStudentStyles'

function AddStudentModal(props) {
  const [firstName, setFirstName] = useState("Anwar");
  const [lastInitial, setLastInitial] = useState("H");
  const [race, setRace] = useState('4');
  const [gender, setGender] = useState('2');
  const [latinX, setLatinX] = useState(true);
  const [iep, setIep] = useState(true);
  const [clickedOnce, setClickedOnce] = useState(true);
  const [clickedOnce2, setClickedOnce2] = useState(true);
  const [email, setEmail] = useState("growthresiliency1234@gmail.com");
  const [grade, setGrade] = useState("8");
  const errors = useSelector((store) => store.errors);

  const demographics = useSelector((store) => store.demographics);
  const dispatch = useDispatch();
  const classes = addStudentStyles();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
    dispatch({ type: 'FETCH_DEMOGRAPHICS' });
  }, [dispatch]);

  const addStudent = (event) => {
    event.preventDefault();
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
    setFirstName('');
    setLastInitial('');
    setRace('');
    setGender('');
    setLatinX(true);
    setIep(true);
    setClickedOnce(false);
    setClickedOnce2(false);
    setEmail('');
    setGrade('');
  };
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
  
  const handleClose = () => {
    props.setOpenAddStudent(false);
  }



  return (
    <Modal
      open={props.openAddStudent}
      onClose={() => {
        handleClose();
      }}
      disableAutoFocus={true}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      
    >
    <Fade in={props.openAddStudent}>
    <FormControl 
      className="formPanel" 
      onSubmit={addStudent}
      className={classes.innerModalWrap}
    >
    <Typography
      sx={{ fontWeight: 400, fontSize: 15, fontFamily: "roboto" }}
      component={'span'}
    >

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className={classes.masterWrap}>
      <div className={classes.splitInputWrap}>
      <Typography
        sx={{ fontWeight: 400, fontSize: 30, fontFamily: "roboto", paddingBottom: .5}}
      >
        Add Student  
      </Typography>
      <div>
        <TextField
          type="first name"
          name="firstName"
          required
          sx={{maxHeight: 40, width: '100%', paddingBottom: 3}}
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
          sx={{maxHeight: 40, width: '100%', paddingBottom: 3}}  
          variant="standard"
          label="Last Initial"
          id="standard-basic"
          value={lastInitial}
          onChange={(event) => setLastInitial(event.target.value)}
        />
      </div>
      
      <div>
        <TextField
          type="email"
          name="email"
          required
          sx={{maxHeight: 40, width: '100%', paddingBottom: 3.5}}
          variant="standard"
          label="Parent's Email"
          id="standard-basic"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="gender"
          onChange={(event) => handleGenderSelection(event)}
        >
          {demographics.gender.length === 0 ? <>loading </> : demographics.gender.map((gender) => (
            <MenuItem 
            key={gender.id} value={gender.id}>
              {gender.name}
            </MenuItem>        
          ))}
        </Select>
      </FormControl>
      <br/><br/>
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
      </div>


      <div className={classes.splitInputWrap}>


      Does this student identify as Hispanic or Latino?
      <RadioGroup row aria-label="role" name="row-radio-buttons-group">
        <FormControlLabel onClick={() => handleHisp(true)} checked={clickedOnce ? latinX : false} control={<Radio />} label="Yes" />
        <FormControlLabel onClick={() => handleHisp(false)}  checked={!latinX} control={<Radio />} label="No" />
      </RadioGroup>
      <br/>
      Is this student on an Individualized Education Plan (IEP)?
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
        onClick={(event) => addStudent(event)}
        sx={{minWidth: 250, minHeight: 85}}
        color={"success"}
      >
        Add Student
      </Button>
      </div>
    </div>
    </Typography>
    </FormControl>
    </Fade>
    </Modal>
  );
}

export default AddStudentModal;
