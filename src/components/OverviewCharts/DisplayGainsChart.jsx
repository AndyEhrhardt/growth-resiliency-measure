import { CollectionsOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';


function DisplayGainsChart({ results }) {

    const lineColors = ['#4A8BD4', '#E42828', '#38C62B', '#DC8221', '#3B4ACD']

    const labels = [];
    const dataPointOne = [];
    const dataPointTwo = [];
    const lineDataSets = [];

    if (results.length > 0) {
        for (let i = 0; i < results[0].length; i++) {
            labels.push(Object.keys(results[0][i]).slice(1));
            dataPointOne.push(Object.values(results[0][i]).slice(1));
            dataPointTwo.push(Object.values(results[1][i]).slice(1));
        }
    }

    
    const sampleData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};
    
// [0][0] shows first [0][i]
// [0][1] shows nothing 

    if (results.length > 0) {
        console.log('dapoint one', dataPointOne);
        console.log('data point two', dataPointTwo)
        for (let i = 0; i < labels[0].length; i++) {
            lineDataSets.push({
                label: labels[0][i],
                data: [parseInt(dataPointOne[0][i]), parseInt(dataPointTwo[0][i])],
                borderColor: lineColors[i],
            })

        }
    }
        // for (let i=1; i<labels.length; i++){
        //     datasetLabel.push(results[0].labels[i])
        // }
    


    console.log('labels FROM LOOP are', labels);
    console.log('dataset IS', dataPointOne);


    console.log('WHAT IS in the store', results);
    console.log('WHAT IS THE FIRST ITEM IN FILTER', results[0]);
    const data = {
        labels: [results[2], results[3]],
        datasets: lineDataSets
    };

    console.log('WHAT IS OUR CHART DATA', data)


    return (
        <div className="chart-container">
            <Line data={data} />
        </div>
    );
}

export default DisplayGainsChart;