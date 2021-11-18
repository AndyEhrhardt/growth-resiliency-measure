import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function DisplayGainsFilters({ displayGainsView, defaultSelection, schoolInfo, demographics, fetchInfo }) {

    const assessmentYears = useSelector(store => store.overview.yearReducer);
    console.log('assessment years', assessmentYears);
    // hooks to hold the selections to display

    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');

    const getGainsInfo = () => {
        let beginDate = moment(dateRange[0]).format("YYYY MM DD");
        let endingDate = moment(dateRange[1]).format("YYYY MM DD");
        let test = searchBy.split('.');
        dispatch({ type: 'FETCH_PARAMETER_QUARTER', payload: { filterBy: "race", searchOn: "name", quarter: 1 } })
    }




    return (
        <>
            {displayGainsView &&
                <>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
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
                                    <MenuItem data='school_name' value={`${logs.school_name}.school_name`}>{logs.school_name}</MenuItem>
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
                        <FormControl sx={{ m: 1, minWidth: 100 }}>

                            <InputLabel id="demo-simple-select-label">Year:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Year"
                                onChange={event}
                                width='50%'
                            >
                                {assessmentYears.map((logs) => (
                                    <MenuItem value={logs.date_part}> {logs.date_part}</MenuItem>
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
                                onChange={event}
                                width='50%'
                            >
                                <MenuItem value={'q1'}>Quarter 1</MenuItem>
                                <MenuItem value={'q2'}>Quarter 2</MenuItem>
                                <MenuItem value={'q3'}>Quarter 3</MenuItem>
                                <MenuItem value={'q4'}>Quarter 4</MenuItem>
                            </Select>
                        </FormControl>
                        to
                        <FormControl sx={{ m: 1, minWidth: 100 }}>

                            <InputLabel id="demo-simple-select-label">Year:</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Year"
                                onChange={event}
                                width='50%'
                            >
                                {assessmentYears.map((logs) => (
                                    <MenuItem value={logs.date_part}> {logs.date_part}</MenuItem>
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
                                onChange={event}
                                width='50%'
                            >
                                <MenuItem value={'q1'}>Quarter 1</MenuItem>
                                <MenuItem value={'q2'}>Quarter 2</MenuItem>
                                <MenuItem value={'q3'}>Quarter 3</MenuItem>
                                <MenuItem value={'q4'}>Quarter 4</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="outlined" onClick={fetchInfo} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Submit
                    </Button>
                    </div>
                </>
            }
        </>
    )
}

export default DisplayGainsFilters;