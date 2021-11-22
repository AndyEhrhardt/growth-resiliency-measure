import React, { useEffect, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';
import moment from 'moment';
import Pdf from "react-to-pdf";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChartLegend from '../ChartLegend/ChartLegend'

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
    let labels = ["Ask For Help", "Self-Confidence w/Adults", "Self-Confidence w/Peers", "Success Under Pressure", "Persistence", "Self-Expression w/Adult", "Self-Expression w/Peer"]
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

    const pdfOptions = {
        orientation: 'landscape',
        unit: 'px',
        format: [800, 350]
    };


    return (
        <>
            <div ref={ref} >
                
                <Typography
                    sx={{ fontWeight: 400, fontSize: 30, fontFamily: "roboto", textAlign: 'center' }}
                >
                    Report for {assessmentData[0].first_name} {assessmentData[0].last_initial}
                </Typography>
                <div className="chart-and-legend-container">
                    <ChartLegend/>
                    <div className="chart-container">
                        <Radar data={data} options={options} sx={{minWidth: 500}}/>
                    </div>
                </div>
                <br />
            </div>
            <Pdf options={pdfOptions} targetRef={ref} filename={`${assessmentData[0].first_name}_${assessmentData[0].last_initial}_resiliency`}>
                {({ toPdf }) => <Button onClick={toPdf}>Generate Pdf</Button>}
            </Pdf>
        </>
    );
}

export default ViewStudentReport;