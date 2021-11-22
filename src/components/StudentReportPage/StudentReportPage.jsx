import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ViewStudentReport from './ViewStudentReport.jsx';
import Typography from "@mui/material/Typography";

function StudentReportPage() {

    // matches parameters of current route
    const {verification_string} = useParams();
    // selects the id from the parameters
    

    // access useDispatch from react-redux
    const dispatch = useDispatch();

    // get assessment information from the reducer
    const assessmentData = useSelector(store => store.studentReport);

    // on page load fetch reports of student ID
    useEffect(() => {
        console.log("on student report page", verification_string)
        dispatch({ type: 'FETCH_SELECTED_STUDENT_REPORTS', payload: verification_string })
    }, [dispatch]);

    return (
        <div>
            {JSON.stringify(assessmentData)}
            {assessmentData.length > 0 &&
            <div>
                
            <ViewStudentReport assessmentData={assessmentData}/>
            </div>
            }
        </div>
    )
}

export default StudentReportPage
