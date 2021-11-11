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
    // { quarter : 1 } || { quarter : 2 }
    // { quarter : 3 } || { quarter : 4 }

    // for search of time range send selected parameter
    // dispatch type FETCH_PARAMETER_RANGE
    // payload: parameter, quarter
    // formatted as above and the time range
    // should be sent in format of 
    // [{start: "2021-09-10"}, {end: "2021"-12-15"}]

  
      // access useDispatch from react-redux
      const dispatch = useDispatch();
  
      // get assessment information from the reducer
      const filter = useSelector(store => store.overview);

    useEffect(() => {
        dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: {race : "name"} })
    }, [dispatch]);
    
    return (
        <div>
            {JSON.stringify(filter)}
        </div>
    );
}

export default OverviewCharts;