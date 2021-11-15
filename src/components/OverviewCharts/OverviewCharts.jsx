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

    const fetchInfo = () => {
        dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: { filterBy: filterValue, searchOn: 'name' } });
    }

    useEffect(() => {
        
        dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
        dispatch({ type: 'FETCH_DEMOGRAPHICS' });
        populateSelections();
    }, [dispatch]);

    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [startTime, endStartTime] = useState('');
    const [selection, setSelection] = useState('');

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    const populateSelections = () => {
        console.log('demographics reducer', demographics);
    }


    return (
        <div>
            {/* {JSON.stringify(schoolInfo)} */}
            {/* {JSON.stringify(demographics)} */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                    <Select
                    defaultValue = ""
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
                {filterValue == 'school' ?
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='50%'
                        >
                            <MenuItem>All</MenuItem>
                            {schoolInfo.map((logs) => (

                                <MenuItem value={logs.school_name}>{logs.school_name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl> : <></>
                }
                {filterValue == 'gender' ?
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='50%'
                        >
                            <MenuItem>All</MenuItem>
                            {demographics.gender.map((logs) => (

                                <MenuItem value={logs.name}>{logs.name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl> : <></>
                }
                {filterValue == 'race' ?
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='50%'
                        >
                            <MenuItem>All</MenuItem>
                            {demographics.race.map((logs) => (

                                <MenuItem value={logs.name}>{logs.name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl> : <></>
                }
                {filterValue == 'district' ?
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Filter By:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='50%'
                        >
                            <MenuItem>All</MenuItem>
                            {schoolInfo.map((logs) => (
                                
                                <MenuItem value={logs.district_name}>{logs.district_name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl> : <></>
                }
                <Button type="submit" variant="outlined" onClick={fetchInfo} sx={{ m: 1, minWidth: 120, height: 30, mt:2 }} >
                    Submit
                </Button>
            </Box>



            <DisplayChart results={filter} />
            {/* <Radar data={data} options={options} /> */}
            {/* {filter.length ? <> </> : 
                <Radar data={data} options={options} />
            } */}
        </div>
    );
}

export default OverviewCharts;