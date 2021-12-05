import React from 'react';
import { Line } from 'react-chartjs-2';

function DisplayGainsChart({ results }) {
    // line colors for chart
    const lineColors = ['#4A8BD4', '#E42828', '#38C62B', '#DC8221', '#3B4ACD']
    // arrays to hold chart data
    const labels = [];
    const dataPointOne = [];
    const dataPointTwo = [];
    const lineDataSets = [];

    // if there are results from the redux store
    // populate the arrays with the data
    if (typeof results != 'undefined' && results.length > 0) {
        for (let i = 0; i < results[0].length; i++) {
            labels.push(Object.keys(results[0][i]).slice(1));
            dataPointOne.push(Object.values(results[0][i]).slice(1));
            dataPointTwo.push(Object.values(results[1][i]).slice(1));
        }
    } 

    // labels to be used for the chart
    let newLabels = [ "Ask For Help",
    "Self-confidence w/Adults",
     "Self-Confidence w/Peers", 
    "Success Under Pressure", 
    "Persistence", 
    "Self-Expression w/Adult", 
    "Self-Expression w/Peer"];

      // if there are results from the redux store
    // populate the arrays with the data
    if (typeof results != 'undefined' && labels.length > 0) {
        for (let i = 0; i < labels[0].length; i++) {
            lineDataSets.push({
                label: newLabels[i],
                data: [parseInt(dataPointOne[0][i]), parseInt(dataPointTwo[0][i])],
                borderColor: lineColors[i],
            })

        }
    }

    // third and fourth item in results array
    // contain the chart labels
    const data = {
        labels: [results[2], results[3]],
        datasets: lineDataSets
    };

    // display title
    const options = {
        title: {
            display: true,
            text: 'Resiliency Gain Chart',
        }
    };

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