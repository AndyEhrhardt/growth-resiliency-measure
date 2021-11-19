import React, { useEffect, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';
import moment from 'moment';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link, Image, PDFDownloadLink } from '@react-pdf/renderer';

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

    let results = [];
    const lineColors = ['#E42828', '#38C62B', '#DC8221', '#3B4ACD']

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
    console.log('parameter label', parameterLabel);
    console.log('data points', dataPoints);
    console.log('keys', keys)

    // data is what will be displayed on
    // radar graph
    const data = {
        labels: labels,
        datasets: graphData,
    };



    const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderBottomColor: '#112131',
          borderBottomStyle: 'solid',
          alignItems: 'stretch',
        },
        detailColumn: {
          flexDirection: 'column',
          flexGrow: 9,
          textTransform: 'uppercase',
        },
        linkColumn: {
          flexDirection: 'column',
          flexGrow: 2,
          alignSelf: 'flex-end',
          justifySelf: 'flex-end',
        },
        name: {
          fontSize: 24,
          fontFamily: 'Lato Bold',
        },
        subtitle: {
          fontSize: 10,
          justifySelf: 'flex-end',
          fontFamily: 'Lato',
        },
        link: {
          fontFamily: 'Lato',
          fontSize: 10,
          color: 'black',
          textDecoration: 'none',
          alignSelf: 'flex-end',
          justifySelf: 'flex-end',
        },
      });

      const MyDocument = () => (
        <Document title={`Report for ${assessmentData[0].first_name} ${assessmentData[0].last_initial}  Taken: ${moment(assessmentData[0].date).format('MMM Do YYYY')}`}>
        
          <Page size="A4" style={styles.page}>
          <View style={styles.section}>
              <Text>Report</Text>
            </View>
            <View style={styles.section}>
           <Radar data={data} options={options} />  
            </View>
            <View>
              <Image src="https://images.unsplash.com/photo-1636202493079-22e07050b2ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"/>
                </View>
          </Page>
        </Document>
      );

    return (
        <>
            <div className="chart-container">
                <Radar data={data} options={options} />
            </div>
            <PDFDownloadLink document={<MyDocument />} fileName="resiliency_report.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
        </>
    );
}

export default ViewStudentReport;