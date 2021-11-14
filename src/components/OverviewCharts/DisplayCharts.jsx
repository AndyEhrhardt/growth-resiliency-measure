import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radar } from 'react-chartjs-2';

function DisplayCharts({ results }) {

    const options = {
        scale: {
            ticks: { beginAtZero: true },
        },
    };
  
    let keys = [];
    let endPointLabels = [];
    let dataPoints = [];
    for (let i = 0; i < results.length; i++) {
        endPointLabels.push(results[i].name);
        keys.push(Object.keys(results[i]));
    }

    for (let i = 0; i < keys.length; i++) {
        dataPoints.push(Object.values(results[i]).slice(1));
    }

    let graphData = [];
    for (let i = 0; i < dataPoints.length; i++) {
        graphData.push({
            label: endPointLabels[i],
            data: dataPoints[i],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#3e95cd',
            borderWidth: 2,
        })
    }
    console.log('graph data is', graphData);

    console.log('results from parent', results);
    console.log('data points', dataPoints);
    console.log('object labels from loop', endPointLabels);
    console.log('object keys, vertices labels', keys);

    const data = {
        labels: keys[0].slice(1),
        datasets: graphData,
    };

    return (
        <div>
            {JSON.stringify(results)}
            <Radar data={data} options={options} />
        </div>
    );
}

export default DisplayCharts;