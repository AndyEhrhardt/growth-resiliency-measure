import {React, useState} from 'react';
import AssessmentRadioChild from '../Assessment_Radio_Child/Assessment_Radio_Child';


function AssessmentFormPage() {
    const [assessmentQ, setAssessmentQ] = useState({
        confidence_adult_start: {name: 'How would you rate the student’s self-confidence with adults at the beginning of the semester/quarter?', score: ''},
        confidence_adult_end: {name: 'How would you rate the student’s self-confidence with adults now?', score: ''},
        confidence_peer_start: {name: 'How would you rate the student’s self-confidence amongst their peers at the beginning of the semester/quarter?', score: ''},
        confidence_peer_end: {name: 'How would you rate the student’s self-confidence amongst their peers now?', score: ''},
        succeed_pressure_start: {name: 'How would you rate the student’s ability to succeed under pressure at the beginning of the semester/quarter?', score: ''},
        succeed_pressure_end: {name: 'How would you rate the student’s ability to succeed under pressure now?', score: ''},
        persistence_start: {name: 'How would you rate the student’s ability to make it through adversity at the beginning of the semester/quarter?', score: ''},
        persistence_end: {name: 'How would you rate the student’s ability to make it through adversity now?', score: ''},
        express_adult_start: {name: 'How would you rate the student’s ability to express who they are as a person with adults at the beginning of the semester/quarter?', score: ''},
        express_adult_end: {name: 'How would you rate the student’s ability to express who they are as a person with adults now?', score: ''},
        express_peer_start: {name: 'How would you rate the student’s ability to express who they are as a person with peers at the beginning of the semester/quarter?', score: ''},
        express_peer_end: {name: 'How would you rate the student’s ability to express who they are as a person with peers now?', score: ''},
        ask_help_start: {name: 'How would you rate the student’s ability to ask for help and get their needs met at the beginning of the semester/quarter?', score: ''},
        ask_help_end: {name: 'How would you rate the student’s ability to ask for help and get their needs met now?', score: ''},
    });

    // var myObject = { 'a': 1, 'b': 2, 'c': 3 };

    // Object.keys(myObject).map(function (key, index) {
    //     myObject[key] * = 2; 
    // });

    // console.log(myObject);
    // => { 'a': 2, 'b': 4, 'c': 6 }
    const updateQuestion = (propertyName, score) => {
        setAssessmentQ({
            ...assessmentQ, // All other questions
            [propertyName] : { // Question you're modifying
                ...assessmentQ[propertyName], // Keep the question 'name'
                score, // Change the question score
            }
        });
    }
    return (
        <>
            {/* {JSON.stringify(assessmentQ)} */}
            {Object.keys(assessmentQ).map((propertyName, i) => {
                const quesObj = assessmentQ[propertyName]; // This is the question object
                return (<AssessmentRadioChild key={i} quesObj={quesObj} updateQuestion={updateQuestion} propertyName={propertyName}/>);
            })}
        </>
    )
}

export default AssessmentFormPage
