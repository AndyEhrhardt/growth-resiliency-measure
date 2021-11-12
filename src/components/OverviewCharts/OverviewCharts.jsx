import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function OverviewCharts() {
    // for parameter only 
    // dispatch type 'FETCH_PARAMETER_RESULTS'
    // payload: parameter
    // send in format
    // { race : "name" } || { gender: "name" } || 
    // { demographics: "hispanic_latino" } ||
    // { school: "name" } || { district: "name" }
    // these are examples, should be able to
    // use any desired parameter in this format

    // for search of quarter send selected parameter
    // dispatch type FETCH_PARAMETER_QUARTER
    // payload: parameter, quarter
    // formatted as above and the quarter 
    // should be sent in format of 
    // filterByQuarter = { quarter : 1 } || 
    // { quarter : 2 }
    // { quarter : 3 } || { quarter : 4 }
    // filterByType = { race: "name" }
    // i.e. [filterByType, filterByQuarter]

    // for search of time range send selected parameter
    // dispatch type FETCH_PARAMETER_RANGE
    // payload: parameter, quarter
    // formatted as above and the time range
    // should be sent in format of 
    // [{race: "name"}, {start: "2021-09-10"}, {end: "2021"-12-15"}]
    // enter as
    // [filterByType, startDate, endDate]

  
      // access useDispatch from react-redux
      const dispatch = useDispatch();
  
      // get assessment information from the reducer
      const filter = useSelector(store => store.overview);
     const filterByType = {race: "name"};
     const filterStartDate = {startDate: '2020-5-2'};
     const filterEndDate = {endDate: '2021-11-2'};
    useEffect(() => {
        dispatch({ type: 'FETCH_PARAMETER_RANGE', payload: [filterByType,filterStartDate, filterEndDate] })
    }, [dispatch]);
    
    return (
        <div>
            {JSON.stringify(filter)}
        </div>
    );
}

export default OverviewCharts;