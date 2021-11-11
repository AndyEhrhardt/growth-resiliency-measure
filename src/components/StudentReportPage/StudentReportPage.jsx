import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function StudentReportPage() {

    // matches parameters of current route
    const allParams = useParams();
    // selects the id from the parameters
    const logId = allParams.id;

    // access useDispatch from react-redux
    const dispatch = useDispatch();

    // get assessment information from the reducer
    const assessmentData = useSelector(store => store.studentReport);

    // on page load fetch reports of student ID
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_REPORTS' })
    }, [dispatch]);

    return (
        <div>
            {JSON.stringify(assessmentData)}
        </div>
    )
}

export default StudentReportPage
