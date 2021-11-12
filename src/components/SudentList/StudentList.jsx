import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


function StudentList(){
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = useSelector((store) => store.students)

    useEffect(() => {
        dispatch({ type: 'FETCH_STUDENTS' });
    }, []);

    const sendEmail = (event) =>{
        event.preventDefault();
        console.log(event.target.value)
    }
    const takeAssessment = (event) =>{
        console.log(event.target.id)
    }
    const handleChangePage = (event, newPage)=> {
        setPage(newPage)
    }


    
    const columns = [
        { field: 'student_name', headerName: 'Name', width: 150 },
        { field: 'grade', headerName: 'Grade', width: 150 },
        { field: 'email_sent', headerName: 'Sent Email', width: 150, renderCell: (params) => {
            if (params.row.email_sent){
                return <Button disabled>Sent</Button>
            } else {
                return <Button value={params.row.parent_email} onClick={(event) => sendEmail(event)}>Send Email</Button>
            }
        } },
        { field: 'assessment_completed', headerName: 'Take Assessment', width: 150, renderCell: (params) => {
            if (params.row.assessment_completed){
                return <Button disabled>Completed</Button>
            } else {
                return <Button value={params.row.id} onClick={(event) => takeAssessment(event)}>Take Assessment</Button>
            }
        } },
        { field: 'parent_email', headerName: `Parent's Email`, width: 150 },
        { field: 'view_assessment', headerName: `View Assessment`, width: 150, renderCell: (params) => {
            return <Button onClick={(event) => takeAssessment(event)}>View</Button>
        } },
    ];

    return(
        <>
            <DataGrid 
                rows={rows} 
                columns={columns} 
            />
        </>
    );
}

export default StudentList;