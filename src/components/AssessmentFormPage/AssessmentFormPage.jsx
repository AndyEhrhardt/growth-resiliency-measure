import {React, useState} from 'react';
import AssessmentRadioChild from '../Assessment_Radio_Child/Assessment_Radio_Child';

function AssessmentFormPage() {
    const [assessmentQ, setAssessmentQ] = useState([
        {name: 'How would you rate the student’s self-confidence with adults at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s self-confidence with adults now?', score: ''},
        {name: 'How would you rate the student’s self-confidence amongst their peers at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s self-confidence amongst their peers now?', score: ''},
        {name: 'How would you rate the student’s ability to succeed under pressure at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s ability to succeed under pressure now?', score: ''},
        {name: 'How would you rate the student’s ability to make it through adversity at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s ability to make it through adversity now?', score: ''},
        {name: 'How would you rate the student’s ability to express who they are as a person with adults at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s ability to express who they are as a person with adults now?', score: ''},
        {name: 'How would you rate the student’s ability to express who they are as a person with peers at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s ability to express who they are as a person with peers now?', score: ''},
        {name: 'How would you rate the student’s ability to ask for help and get their needs met at the beginning of the semester/quarter?', score: ''},
        {name: 'How would you rate the student’s ability to ask for help and get their needs met now?', score: ''},
    ]);

    return (
        <>
            {assessmentQ.map((quesObj) => {
                return(<AssessmentRadioChild key={assessmentQ.indexOf(quesObj)} quesObj={quesObj} setAssessmentQ={setAssessmentQ} assessmentQ={assessmentQ}/>);
            })}  
        </>
    )
}

export default AssessmentFormPage

