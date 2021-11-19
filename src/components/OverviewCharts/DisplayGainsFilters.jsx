import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DisplayGainsChart from './DisplayGainsChart';

function DisplayGainsFilters({ displayGainsView, defaultSelection, schoolInfo, demographics, filter }) {
    // for search of quarter send selected parameter
    // dispatch type FETCH_PARAMETER_QUARTER
    // payload: parameter, quarter
    // formatted as above and the quarter 
    // should be sent in format of 
    // i.e. payload: {filterBy : "race", searchOn: "name", quarter: 1} 

    const assessmentYears = useSelector(store => store.overview.yearReducer);
    const dispatch = useDispatch();

    const getGainsInfo = () => {
        let test = searchBy.split('.');
        let beginFirstSelectedQuarter = firstQuarterSelected.split('.')[0];
        let endFirstSelectedQuarter = firstQuarterSelected.split('.')[1];
        let beginSecondSelectedQuarter = secondQuarterSelected.split('.')[0];
        let endSecondSelectedQuarter = secondQuarterSelected.split('.')[1];
        console.log('start 1st q selected', beginFirstSelectedQuarter);
        console.log('end 1st q selected', endFirstSelectedQuarter);
        console.log('start 2nd q selected', beginSecondSelectedQuarter);
        console.log('end 2nd q selected', endSecondSelectedQuarter);
        dispatch({ type: 'GET_GAINS_BY_QUARTER', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1], beginQ1: beginFirstSelectedQuarter, endQ1: endFirstSelectedQuarter, beginQ2: beginSecondSelectedQuarter, endQ2: endSecondSelectedQuarter } });
    }

    // hooks for storing selected dates
    const [firstYearSelected, setFirstYearSelected] = useState();
    const [secondYearSelected, setSecondYearSelected] = useState();
    const [firstQuarterSelected, setFirstQuarterSelected] = useState();
    const [secondQuarterSelected, setSecondQuarterSelected] = useState();
    const adjustedFirstYear = firstYearSelected+1;
    const adjustedSecondYear = secondYearSelected+1;
    // hooks for storing selected data filters
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');

    // object for quarter dates and selected yeaer
    // 2021-2021 year
    // q1 is assumed to be 09/01-10/31
    // q2 is assumed to be 11/01-01/31
    // q3 is assumed to be 02/01-04/30
    // q4 is assumed to be 04/31-08/31

    const firstDates = {
        q1: `${firstYearSelected}/09/01.${firstYearSelected}/10/31`,
        q2: `${firstYearSelected}/11/01.${adjustedFirstYear}/01/31`,
        q3: `${adjustedFirstYear}/02/01.${adjustedFirstYear}/03/30`,
        q4: `${adjustedFirstYear}/04/01.${adjustedFirstYear}/08/31`
    };

    const secondDates = {
        q1: `${secondYearSelected}/09/01.${secondYearSelected}/10/31`,
        q2: `${secondYearSelected}/11/01.${adjustedSecondYear}/01/31`,
        q3: `${adjustedSecondYear}/02/01.${adjustedSecondYear}/03/30`,
        q4: `${adjustedSecondYear}/04/01.${adjustedSecondYear}/08/31`
    };

    return (
        <>
            {displayGainsView &&
                <>
                    <h3>Display Gains Data on Line Chart</h3>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        {/* Select which main filter to display */}
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

                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        {/* Select item to filter on based on table data */}
                        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='20%'
                            defaultValue='name'

                        >
                            <MenuItem value={defaultSelection}>Display All</MenuItem>
                            {filterValue == 'school' &&
                                schoolInfo.map((logs) => (
                                    <MenuItem data='name' value={`${logs.school_name}.name`}>{logs.school_name}</MenuItem>
                                ))
                            }
                            {filterValue == 'gender' &&
                                demographics.gender.map((logs) => (
                                    <MenuItem key={logs.id} value={`${logs.name}.name`}>{logs.name}</MenuItem>
                                ))
                            }
                            {filterValue == 'race' &&
                                demographics.race.map((logs) => (
                                    <MenuItem key={logs.id} value={`${logs.name}.name`}>{logs.name}</MenuItem>
                                ))
                            }
                            {filterValue == 'district' &&
                                schoolInfo.map((logs) => (
                                    <MenuItem key={logs.id} value={`${logs.district_name}.name`}>{logs.district_name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                    <div className='main-selection'>
                        {/* Select first year and quarter */}
                        <FormControl sx={{ m: 1, minWidth: 100 }}>

                            <InputLabel id="demo-simple-select-label">Year:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Year"
                                onChange={event => setFirstYearSelected(event.target.value)}
                                width='50%'
                            >
                                {assessmentYears.map((logs) => (
                                    <MenuItem value={logs.date_part}> {logs.date_part}-{logs.date_part+1}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">Quarter:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Quarter"
                                onChange={event => setFirstQuarterSelected(event.target.value)}
                                width='50%'
                            >
                                <MenuItem value={firstDates.q1}>Quarter 1</MenuItem>
                                <MenuItem value={firstDates.q2}>Quarter 2</MenuItem>
                                <MenuItem value={firstDates.q3}>Quarter 3</MenuItem>
                                <MenuItem value={firstDates.q4}>Quarter 4</MenuItem>
                            </Select>
                        </FormControl>
                        to
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            {/* Select second year and quarter */}
                            <InputLabel id="demo-simple-select-label">Year:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Year"
                                onChange={event => setSecondYearSelected(event.target.value)}
                                width='50%'
                            >
                                {assessmentYears.map((logs) => (
                                    <MenuItem value={logs.date_part}> {logs.date_part}-{logs.date_part+1}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">Quarter:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Quarter"
                                onChange={event => setSecondQuarterSelected(event.target.value)}
                                width='50%'
                            >
                                <MenuItem value={secondDates.q1}>Quarter 1</MenuItem>
                                <MenuItem value={secondDates.q2}>Quarter 2</MenuItem>
                                <MenuItem value={secondDates.q3}>Quarter 3</MenuItem>
                                <MenuItem value={secondDates.q4}>Quarter 4</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="outlined" onClick={getGainsInfo} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                            Submit
                        </Button>
                    </div>
                    <DisplayGainsChart filter={filter}/>
                </>
            }
           
        </>
    )
}

export default DisplayGainsFilters;