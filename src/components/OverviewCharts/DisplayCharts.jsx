import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

function DisplayCharts({ results }) {

    const options = {
        scale: {
            ticks: { beginAtZero: true },
        },
    };

    const lineColors = ['#4A8BD4', '#E42828', '#38C62B', '#DC8221', '#3B4ACD' ]
    

    let keys = [];
    let endPointLabels = [];
    let dataPoints = [];
    for (let i = 0; i < results.length; i++) {
        endPointLabels.push(results[i].name);
        keys.push(Object.keys(results[i]).slice(1));
        console.log('keys in loop',Object.keys(results[i]))
    }

    for (let i = 0; i < keys.length; i++) {
        dataPoints.push(Object.values(results[i]).slice(1));
        console.log('in loop', dataPoints)
    }

    let graphData = [];
    for (let i = 0; i < dataPoints.length; i++) {
        graphData.push({
            label: endPointLabels[i],
            data: dataPoints[i],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: lineColors[i],
            borderWidth: 2,
        })
    }
    console.log('graph data is', graphData);

    console.log('results from parent', results);
    console.log('data points', dataPoints);
    console.log('object labels from loop', endPointLabels);
    console.log('object keys, vertices labels', keys);

    const data = {
        labels: keys[0],
        datasets: graphData,
    };

    return (
        <div>
            {/* {JSON.stringify(results)} */}
            <Radar data={data} options={options} />
        </div>
    );
}

export default DisplayCharts;