import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from 'react'
import TableContainer from '@material-ui/core/TableContainer';
import {FormControl,Select} from '@mui/material';
// import { ArrowBackIcon } from '@mui/icons-material';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@mui/material/TextField";
import { Paper, Button } from '@material-ui/core';


function SchoolAndDistrict() {
  // Allows admin to add schools and districts
  const store = useSelector(store => store.districtSchool);
  console.log(store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
  }, [dispatch])

  const [school, setSchool] = useState('');
  const [district, setDistrict] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  const handleAdd = () => {
    setOpenAdd(!openAdd);

  }


  return (
    <>
      <Paper elavation={12} sx={{ width: '100%' }}>
        <Button variant="contained" color="secondary">Student List</Button>

        <TableContainer>
          <Table>
            <TableHead >
              <TableRow style={{ top: 57, minWidth: 1700 }}>
                <TableCell>School</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Q1</TableCell>
                <TableCell>Q2</TableCell>
                <TableCell>Q3</TableCell>
                <TableCell>Q4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table_body">
              <TableRow className="row_data">
                {store.map((school) => {
                  return <TableCell className="school" key={school.school_name}>{school.school_name} {school.district_name} {school.q1} {school.q2} {school.q3} {school.q4}</TableCell>
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
      <Button onClick={handleAdd} variant="contained" color="primary">Add School</Button>

      <form className="form_add" onSubmit={handleSubmitAdd} >
        <div className="school_add">
          <TextField type="text"
            placeholder="School"
            value={school}
            onChange={(event) => setAddSchool(event.target.value)}

          />
        </div>
        <div className="district_add">
              
        <FormControl>
          <Select
          value={district}
          label="District"
          onChange={(event) =>setDistrict(event.target.value)}
          >
          </Select>
        </FormControl>

        </div>

        <Button
        
        >
          Add

        </Button>
        


      </form>

    </>
  );
}

export default SchoolAndDistrict;