import React, { useEffect, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';

function ViewStudentReport( {assessmentData} ) {
        // graph will start at 0
    // end at 5 and have
    // step size of 1
    const options = {
        maintainAspectRatio: false,
        scale: {
            min: 0,
            max: 5,
            ticks: {
                stepSize: 1,
                min: 0,
                max: 5
            }
        }
    };
    
    return(
        <>
        </>
    );
}

export default ViewStudentReport;