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

    let results = [];
    const lineColors = ['#4A8BD4', '#E42828', '#38C62B', '#DC8221', '#3B4ACD' ]

    console.log('ASSESSMENT DATA', assessmentData)
    
    // empty array to hold values for graph display
    // keys are assessment questions
    let keys = [];
    // parameter label is the key for the lines
    let parameterLabel = [];
    // data points are the average results of
    // the assessment questions for selected parameters
    let dataPoints = [];
    // graph data is what will be rendered on the chart
    let graphData = [];

    // for items in the overview reducer
    // get the parameter labels and the assessment questions
    // add to keys and parameterLabel arrays
    for (let i = 0; i < assessmentData.length; i++) {
        // parameterLabel.push(results[i].name);
        keys.push(Object.keys(results[i]).slice(1));
    }
    // for every item in assessment questions
    // get the average results and add to dataPoints array
    for (let i = 0; i < keys.length; i++) {
        dataPoints.push(Object.values(results[i]).slice(1));
    }

    // for every parameter label
    // display label and results
    // colors are retrieved from lineColors array
    for (let i = 0; i < assessmentData.length; i++) {
        graphData.push({
            label: parameterLabel[i],
            data: dataPoints[i],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: lineColors[i],
            borderWidth: 2,
        })
    }
    console.log('parameter label', parameterLabel);
    console.log('data points', dataPoints);
    console.log('keys', keys)
    
    // data is what will be displayed on
    // radar graph
    const data = {
        labels: keys[0],
        datasets: graphData,
    };
    
    return(
        <>
          <div className="chart-container">
            <Radar data={data}  options={options} />
            </div>
        </>
    );
}

export default ViewStudentReport;