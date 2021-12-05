import { CollectionsOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from "react-to-pdf";

function DisplayGainsChart({ results }) {

    const lineColors = ['#4A8BD4', '#E42828', '#38C62B', '#DC8221', '#3B4ACD']

    const labels = [];
    const dataPointOne = [];
    const dataPointTwo = [];
    const lineDataSets = [];

    if (typeof results != 'undefined' && results.length > 0) {
        for (let i = 0; i < results[0].length; i++) {
            labels.push(Object.keys(results[0][i]).slice(1));
            dataPointOne.push(Object.values(results[0][i]).slice(1));
            dataPointTwo.push(Object.values(results[1][i]).slice(1));
        }
    }


    // [0][0] shows first [0][i]
    // [0][1] shows nothing 

    let newLabels = [ "Ask For Help",
    "Self-confidence w/Adults",
     "Self-Confidence w/Peers", 
    "Success Under Pressure", 
    "Persistence", 
    "Self-Expression w/Adult", 
    "Self-Expression w/Peer"];

    if (typeof results != 'undefined' && labels.length > 0) {
        console.log('data point one', dataPointOne);
        console.log('data point two', dataPointTwo)
        for (let i = 0; i < labels[0].length; i++) {
            lineDataSets.push({
                label: newLabels[i],
                data: [parseInt(dataPointOne[0][i]), parseInt(dataPointTwo[0][i])],
                borderColor: lineColors[i],
            })

        }
    }

    console.log('labels FROM LOOP are', labels);
    console.log('dataset IS', dataPointOne);
    console.log('WHAT IS in the store', results);
    console.log('WHAT IS THE FIRST ITEM IN FILTER', results[0]);
    const data = {
        labels: [results[2], results[3]],
        datasets: lineDataSets
    };

    const options = {
        title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
        }
    };

    console.log('WHAT IS OUR CHART DATA', data)
    // ref for displaying PDF 
    const ref = React.createRef();

    return (
        <>
        <div ref={ref} className="chart-container">
            <Line data={data} options={options} />
        </div>
      </>
    );
}

export default DisplayGainsChart;