import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayChart from './DisplayCharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



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
    const schoolInfo = useSelector(store => store.districtSchool);
    const demographics = useSelector(store => store.demographics);

    // once the submit button is clicked dispatch
    // desired information to overview charts
    const fetchInfo = () => {
        console.log("fetching info", event);
        if (searchBy === 'name'){
        dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: { filterBy: filterValue, searchOn: searchBy } });
        }
        else {
            dispatch({type: 'FETCH_SPECIFIC_DATA', payload: {filterBy: filterValue, searchOn: searchBy }});
        }
    }

    // on page load get the list of schools
    // and demographic options to display
    // on drop down selections
    useEffect(() => {
        dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
        dispatch({ type: 'FETCH_DEMOGRAPHICS' });

    }, [dispatch]);

    // hooks to hold the selections to display
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const defaultSelection = 'name';
    const [startTime, endStartTime] = useState('');
    const [selection, setSelection] = useState('');



    return (
        <div>
            {/* {JSON.stringify(schoolInfo)} */}
            {/* {JSON.stringify(demographics)} */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                    <Select
                        defaultValue="Filter By"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Filter By"
                        onChange={event => setFilterValue(event.target.value)}
                        width='50%'
                    >
                        <MenuItem value={'school'}>School</MenuItem>
                        <MenuItem value={'district'}>District</MenuItem>
                        <MenuItem value={'race'}>Race</MenuItem>
                        <MenuItem value={'gender'}>Gender</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Filter By"
                        onChange={event => setSearchBy(event.target.value)}
                        width='50%'
                        defaultValue='name'
                    >
                        <MenuItem value={defaultSelection}>Display All</MenuItem>
                        {filterValue == 'school' &&
                            schoolInfo.map((logs) => (
                                <MenuItem data='school_name' value={logs.school_name}>{logs.school_name}</MenuItem>
                            ))
                        }
                        {filterValue == 'gender' &&
                            demographics.gender.map((logs) => (
                                <MenuItem key={logs.id} value={logs.name}>{logs.name}</MenuItem>
                            ))
                        }
                        {filterValue == 'race' &&
                            demographics.race.map((logs) => (
                                <MenuItem key={logs.id} value={logs.name}>{logs.name}</MenuItem>
                            ))
                        }
                        {filterValue == 'district' &&
                            schoolInfo.map((logs) => (
                                <MenuItem key={logs.id} value={logs.district_name}>{logs.district_name}</MenuItem>
                            ))
                        }
                    </Select>
                    <Button type="submit" variant="outlined" onClick={fetchInfo} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Submit
                    </Button>
                </FormControl>
            </Box>
            <DisplayChart results={filter} />
        </div>
    );
}

export default OverviewCharts;