import {Radio, RadioGroup, FormControlLabel, Box} from '@material-ui/core';
import React from 'react';

function AssessmentRadioChild({quesObj, propertyName, updateQuestion}) {
    const handleValueChange = (event) => {
        //console.log(`Score ${parseInt(event.target.value)}`);
        // setAssessmentQ(assessmentQ.map((item, i) => i === assessmentQ.indexOf(quesObj) ? {... item, score: parseInt(event.target.value)} : item));
        updateQuestion(propertyName, `${event.target.value}`);
    }

    return(
        <>
            <Box>
                <p>{quesObj.name}</p>
                <RadioGroup row style={{justifyContent: 'center'}} aria-label="Question" value={quesObj.score} onChange={(event) => handleValueChange(event)}>
                    <FormControlLabel value="1" control={<Radio/>} label="1" labelPlacement="top"/>
                    <FormControlLabel value="2" control={<Radio/>} label="2" labelPlacement="top"/>
                    <FormControlLabel value="3" control={<Radio/>} label="3" labelPlacement="top"/>
                    <FormControlLabel value="4" control={<Radio/>} label="4" labelPlacement="top"/>
                    <FormControlLabel value="5" control={<Radio/>} label="5" labelPlacement="top"/>
                </RadioGroup>
            </Box>
        </>
    );
}

export default AssessmentRadioChild;
