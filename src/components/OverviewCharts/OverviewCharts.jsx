import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radar } from 'react-chartjs-2';
import DisplayChart from './DisplayCharts';



function OverviewCharts() {
    // for parameter only 
    // dispatch type 'FETCH_PARAMETER_RESULTS'
    // payload: parameter
    // send in format
    //  payload: {filterBy : "race", searchOn: "name" }

    // for search of quarter send selected parameter
    // dispatch type FETCH_PARAMETER_QUARTER
    // payload: parameter, quarter
    // formatted as above and the quarter 
    // should be sent in format of 
    // i.e. payload: {filterBy : "race", searchOn: "name", quarter: 1} 

    // for search of time range send selected parameter
    // dispatch type FETCH_PARAMETER_RANGE
    // payload: parameter, quarter
    // formatted as above and the time range
    // should be sent in format of 
    // payload: {filterBy : "race", searchOn: "name", startDate: "2020-5-2", endDate: "2021-11-12"} 


    // access useDispatch from react-redux
    const dispatch = useDispatch();
  
    // get assessment information from the reducer
    const filter = useSelector(store => store.overview);

    useEffect(() => {
        dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: { filterBy: "race", searchOn: "name" } });
    }, [dispatch]);

  const labels = [];

    return (
        <div>
            {/* {JSON.stringify(dispatch)} */}
            
                <DisplayChart results = {filter}/>
            {/* <Radar data={data} options={options} /> */}
             {/* {filter.length ? <> </> : 
                <Radar data={data} options={options} />
            } */}
        </div>
    );
}

export default OverviewCharts;