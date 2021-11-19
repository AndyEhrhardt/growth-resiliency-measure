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
import demographicsModalStyles from './DemographicsModalStyle.js';

function AddStudentModal({ userStore, demoPosted, setDemoPosted }) {
    const errors = useSelector((store) => store.errors);
    const demographics = useSelector((store) => store.demographics);
    const dispatch = useDispatch();
    const classes = demographicsModalStyles();

    useEffect(() => {
        dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
        dispatch({ type: 'FETCH_DEMOGRAPHICS' });
    }, [dispatch]);

    const addStudent = () => {
        alert('POST DEMOGRAPHICS');
        dispatch({type: 'PUT_USER_DEMOGRAPHICS', payload: userStore});
        setDemoPosted(true);
    };
    const handleHispLat = (event) => {
        console.log(event.target.value);
        dispatch({type: 'EDIT_USER_HISPLAT', payload: event.target.value});
    }
    const handleIep = (event) => {
        console.log(event.target.value)
        dispatch({type: 'EDIT_USER_IEP', payload: event.target.value});
    }
    const handleGenderSelection = (event) => {
        console.log(event.target.value)
        dispatch({type: 'EDIT_USER_GENDER', payload: event.target.value});
    }
    const handleRaceSelection = (event) => {
        console.log(event.target.value)
        dispatch({type: 'EDIT_USER_RACE', payload: event.target.value});
    }
    const handleGradeSelection = (event) => {
        console.log(event.target.value)
        dispatch({type: 'EDIT_USER_GRADE', payload: event.target.value});
    }

    return (
        <div>
            <FormControl
                className="formPanel"
                className={classes.formControl}
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
                                sx={{ fontWeight: 400, fontSize: 30, fontFamily: "roboto", paddingBottom: .5 }}
                            >
                                Review Demographics
                            </Typography>
                            <div>
                                <TextField
                                    type="first name"
                                    name="firstName"
                                    required
                                    sx={{ maxHeight: 40, width: '100%', paddingBottom: 3 }}
                                    variant="standard"
                                    label="First Name"
                                    id="standard-basic"
                                    value={userStore.first_name}
                                    disabled={true}
                                    /* onChange={(event) => setFirstName(event.target.value)} */
                                />
                            </div>

                            <div>
                                <TextField
                                    type="lastInitial"
                                    name="lastInitial"
                                    required
                                    sx={{ maxHeight: 40, width: '100%', paddingBottom: 3 }}
                                    variant="standard"
                                    label="Last Initial"
                                    id="standard-basic"
                                    value={userStore.last_initial}
                                    disabled={true}
                                    /* onChange={(event) => setLastInitial(event.target.value)} */
                                />
                            </div>

                            <div>
                                <TextField
                                    type="email"
                                    name="email"
                                    required
                                    sx={{ maxHeight: 40, width: '100%', paddingBottom: 3.5 }}
                                    variant="standard"
                                    label="Parent's Email"
                                    id="standard-basic"
                                    value={userStore.parent_email}
                                    disabled={true}
                                    /* onChange={(event) => setEmail(event.target.value)} */
                                />
                            </div>

                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={userStore.gender_id}
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
                            <br /><br />
                            <FormControl fullWidth>
                                <InputLabel>Race</InputLabel>
                                <Select
                                    value={userStore.race_id}
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
                            <RadioGroup row aria-label="role" name="row-radio-buttons-group" value={userStore.hispanic_latino} onChange={(event) => handleHispLat(event)}>
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            <br />
                            Is this student on an Individualized Education Plan (IEP)?
                            <RadioGroup row aria-label="role" name="row-radio-buttons-group" value={userStore.iep} onChange={(event) => handleIep(event)}>
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            <br />

                            <FormControl fullWidth>
                                <InputLabel>Grade</InputLabel>
                                <Select
                                    value={userStore.grade}
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
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                onClick={()=> addStudent()}
                                sx={{ minWidth: 250, minHeight: 85 }}
                                color={"success"}
                            >
                                Confirm Demographics
                            </Button>
                        </div>
                    </div>
                </Typography>
            </FormControl>
        </div>
    );
}

export default AddStudentModal;
