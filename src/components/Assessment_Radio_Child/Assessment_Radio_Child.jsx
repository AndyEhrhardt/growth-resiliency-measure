import {Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import { useState } from 'react';

function AssessmentRadioChild() {
    const [score, setScore] = useState('');

    const handleValueChange = (event) => {
        setScore(event.target.value);
    }

    return(
        <>
            <RadioGroup row aria-label="Question" value={value} onChange={handleValueChange}>
                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="top"/>
                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="top"/>
                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="top"/>
                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="top"/>
                <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="top"/>
            </RadioGroup>
        </>
    );
}

export default AssessmentRadioChild;