import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import TableContainer from '@material-ui/core/TableContainer';
// import { ArrowBackIcon } from '@mui/icons-material';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import{Paper,Button} from '@material-ui/core';


function SchoolAndDistrict() {
  // Allows admin to add schools and districts
  const store = useSelector(store => store.districtSchool);
  console.log(store);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
  }, [dispatch])


  return (
    <>
    <Paper elavation= {12}sx ={{width: '100%'}}>
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
     <Button variant="contained" color="primary">Add School</Button>
     </>
  );
}

export default SchoolAndDistrict;