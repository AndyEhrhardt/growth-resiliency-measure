import React, { useEffect, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';
import moment from 'moment';
import Pdf from "react-to-pdf";

function ViewStudentReport({ assessmentData }) {
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

  
    const lineColors = ['#3B4ACD']

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

    let studentName = `${assessmentData[0].first_name} ${assessmentData[0].last_initial}   ${moment(assessmentData[0].date).format('MMM Do YYYY')}`;
    let labels = ["Ask For Help", "Confidence Towards Adults", "Confidence Towards Peers", "Succeed Pressure", "Persistence", "Express Adult", "Express Peer"]
    // // for items in the overview reducer
    // // get the parameter labels and the assessment questions
    // // add to keys and parameterLabel arrays
    for (let i = 0; i < labels.length; i++) {
        // parameterLabel.push(results[i].name);
        keys.push(labels[i]);
    }
    // for every item in assessment questions
    // get the average results and add to dataPoints array
    for (let i = 0; i < assessmentData.length; i++) {
        dataPoints.push(Object.values(assessmentData[i]).slice(3));
    }

    // // for every parameter label
    // // display label and results
    // // colors are retrieved from lineColors array
    for (let i = 0; i < assessmentData.length; i++) {
        graphData.push({
            label: studentName,
            data: dataPoints[i],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: lineColors[i],
            borderWidth: 2,
        })
    }

    // data is what will be displayed on
    // radar graph
    const data = {
        labels: labels,
        datasets: graphData,
    };

    // ref for displaying PDF 
      const ref = React.createRef();

    return (
        <>
    
      <div ref={ref} className="chart-container">
        <Radar data={data} options={options} />
      </div> <br />
      <Pdf targetRef={ref} filename={`${assessmentData[0].first_name}_${assessmentData[0].last_initial}_resiliency`}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
        </>
    );
}

export default ViewStudentReport;