import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from 'react'
import TableContainer from '@material-ui/core/TableContainer';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
// import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Snackbar} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@mui/material/TextField";
import { Paper, Button } from '@material-ui/core';
import moment from "moment";



function SchoolAndDistrict() {
  // Allows admin to add schools and districts
  const [school, setSchool] = useState('');
  const [district, setDistrict] = useState('');
 
  const [domain, setDomain] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [close, setClose] = useState(true);

  const store = useSelector(store => store.districtSchool);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
  }, []);

  const history = useHistory();

  const handleAdd = (boo) => {
    setOpenAdd(boo);
    setClose(!close)
  }
  const handleSetSchool = (event) => {
    event.preventDefault();
    setSchool(event.target.value);
  }

  const handleChange = (event) => {
    setDistrict(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(school, district,domain)
    dispatch({type: 'ADD_SCHOOL', payload: {
      school: school,
      district: district,
      domain: domain,
     }})
    setSchool('');
    setDistrict('');
    setDomain('');
  }

  const handleBackToStudentsList = () =>{
    history.push('/studentList');
  }

  return (
    <div>
      <Paper elavation={12} sx={{ width: '100%' }}>
        <Button onClick={handleBackToStudentsList} variant="contained" color="secondary">Student List</Button>
        <TableContainer>
          <Table>
            <TableHead >
              <TableRow style={{ top: 57, minWidth: 1700 }}>
                <TableCell>School</TableCell>
                <TableCell>District</TableCell>
                <TableCell >Q1</TableCell>
                <TableCell >Q2</TableCell>
                <TableCell >Q3</TableCell>
                <TableCell >Q4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table_body">
              {store.map((school) => {
                return <TableRow key={school.school_id} className="row_data">
                  <TableCell className="school">{school.school_name}</TableCell>
                  <TableCell>{school.district_name} </TableCell>
                  <TableCell >{moment(school.q1).format('MM/DD/YYYY')} </TableCell>
                  <TableCell>{moment(school.q2).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>{moment(school.q3).format('MM/DD/YYYY')}</TableCell>
                  <TableCell >{moment(school.q4).format('MM/DD/YYYY')}</TableCell>

                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
      {close && <Button onClick={() => handleAdd(true)} variant="contained" color="primary"> Add School </Button>}

      {openAdd &&
        <form onSubmit={(event) => handleSubmit(event)} className="form_add" >

          <div className="school_add">
            <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="School"
              value={school}
              onChange={(event) => handleSetSchool(event)}

            />
          </div>
          <div className="district_add">

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">District</InputLabel>
              <Select
                value={district}
                label="district"
                onChange={(event) => handleChange(event)}
              >
                {store.map((district) => (
                 
                  <MenuItem key={district.district_name} value={district.district_id}>{district.district_name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </div>
          {/* <div className="quater1">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="Q1"
              value={q1}
              onChange={(event) => setQ1(event.target.value)}

            />
          
          </div> */}
          {/* <div className="quater2">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="Q2"
              value={q2}
              onChange={(event) => setQ2(event.target.value)}
              /> */}

          {/* </div>
          <div className="quater3">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="Q3"
              value={q3}
              onChange={(event) => setQ3(event.target.value)}
              /> */}

          {/* </div> */}
          {/* <div className="quater4">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="Q4"
              value={q4}
              onChange={(event) => setQ4(event.target.value)}
              />


          </div> */}
          <div className="domain">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="domain"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              />

          </div>
          {/* <div className="created_at">
          <TextField sx={{ m: 1, width: 300 }} type="text"
              placeholder="created at"
              value={created_at}
              onChange={(event) => setCreated_at(event.target.value)}
              />
          
          </div> */}

          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Add School
          </Button>

        </form>
      }
      {/* {school}{district} {q1}{q2}{q3}{q4}{domain}{created_at} */}
    </div>
  );
}

export default SchoolAndDistrict;