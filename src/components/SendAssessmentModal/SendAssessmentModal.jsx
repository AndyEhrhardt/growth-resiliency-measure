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
import sendAssessmentStyles from './sendAssessmentStyles'

function SendAssessmentModal(props) {

  const dispatch = useDispatch();
  const classes = sendAssessmentStyles();
  const [email, setEmail] = useState(props.parentsEmail);


  const handleClose = () => {
    props.setOpenSendAssessment(false);
  }
  const sendEmail = () => {
    console.log(props.parentsEmail)
    console.log(props.studentId)
    dispatch({type: 'SEND_ASSESSMENT', payload: {email: props.parentsEmail, studentId: props.studentId}})
  }


  return (
    <Modal
      open={props.openSendAssessment}
      onClose={() => {
        handleClose();
      }}
      disableAutoFocus={true}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}

    >
      <Fade
        in={props.openSendAssessment}
      >
        <div className={classes.innerModalWrap}>
          <Typography
            sx={{ fontWeight: 400, fontSize: 15, fontFamily: "roboto" }}
          >

            <div className={classes.masterWrap}>
              <Typography
                sx={{ fontWeight: 400, fontSize: 30, fontFamily: "roboto", paddingBottom: .5 }}
              >
                Send Email
              </Typography>
              <div>
                <TextField
                  type="email"
                  name="email"
                  required
                  sx={{ maxHeight: 40, paddingBottom: 3 }}
                  variant="standard"
                  label="Parent's Email"
                  id="standard-basic"
                  value={props.parentsEmail}
                  onChange={(event) => props.setParentsEmail(event.target.value)}
                />
              </div>
              <Button onClick={sendEmail}>Send Email</Button>
            </div>
          </Typography>
        </div>
      </Fade>
    </Modal>
  );
}

export default SendAssessmentModal;
