import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import SendAssessmentModal from '../SendAssessmentModal/SendAssessmentModal'

function StudentList() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [openSendAssessment, setOpenSendAssessment] = useState(false);
    const [parentsEmail, setParentsEmail] = useState('');
    const [studentId, setStudentId] = useState(0);

    const rows = useSelector((store) => store.students)

    useEffect(() => {
        dispatch({ type: 'FETCH_STUDENTS' });
    }, []);

    const sendEmail = (email, id) => {
        console.log(id)
        setParentsEmail(email);
        setStudentId(id);
        setOpenSendAssessment(true);
    }
    const teacherColumns = [
        { field: 'student_name', headerName: 'Name', width: 120 },
        { field: 'grade', headerName: 'Grade', width: 80 },
        {
            field: 'email_sent', headerName: 'Send Email', width: 110, renderCell: (params) => {
                if (params.row.email_sent) {
                    return <Button disabled>Sent</Button>
                } else {
                    return <Button onClick={() => sendEmail(params.row.parent_email, params.row.id)}>Send Email</Button>
                }
            }
        },
        {
            field: 'assessment_completed', headerName: 'Take Assessment', width: 150, renderCell: (params) => {
                if (params.row.assessment_completed) {
                    return <Button disabled>Completed</Button>
                } else {
                    return <Button value={params.row.id} onClick={(event) => takeAssessment(event)}>Take Assessment</Button>
                }
            }
        },
        { field: 'parent_email', headerName: `Parent's Email`, width: 200 },
        {
            field: 'view_assessment', headerName: `View Report`, width: 110, renderCell: (params) => {
                return <Button onClick={(event) => takeAssessment(event)}>View</Button>
            }
        },
    ];

    const adminColumns = [
        { field: 'student_name', headerName: 'Name', width: 120 },
        { field: 'grade', headerName: 'Grade', width: 80 },
        {
            field: 'email_sent', headerName: 'Send Email', width: 110, renderCell: (params) => {
                if (params.row.email_sent) {
                    return <Button disabled>Sent</Button>
                } else {
                    return <Button onClick={() => sendEmail(params.row.parent_email, params.row.id)}>Send Email</Button>
                }
            }
        },
        {
            field: 'assessment_completed', headerName: 'Assessment', width: 140, renderCell: (params) => {
                if (params.row.assessment_completed) {
                    return <p>Completed</p>
                } else {
                    return <p>Needed</p>
                }
            }
        },
        { field: 'parent_email', headerName: `Parent's Email`, width: 200 },
        {
            field: 'view_assessment', headerName: `View Report`, width: 110, renderCell: (params) => {
                return <Button onClick={(event) => takeAssessment(event)}>View</Button>
            }
        },
    ];



    const takeAssessment = (event) => {
        console.log(event.target.id)
    }



    return (
        <>
            <SendAssessmentModal studentId={studentId} parentsEmail={parentsEmail} setParentsEmail={setParentsEmail} openSendAssessment={openSendAssessment} setOpenSendAssessment={setOpenSendAssessment} />
            <DataGrid
                rows={rows.studentList}
                columns={rows.teacherView ? teacherColumns : adminColumns}
                rowsPerPageOptions={[]}
            />
        </>
    );
}

export default StudentList;