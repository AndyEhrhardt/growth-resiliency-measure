import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import moment from 'moment';

function SelectRadarWithTime({displayTimePicker, defaultSelection, schoolInfo, demographics, filter}) {

    const fetchInfo = () => {
        // if a date range and 'display all'
        // options are selected dispatch date and filter values
        if (applyDateFilter && searchBy === "name") {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            console.log("begin date", beginDate);
            dispatch({
                type: 'FETCH_PARAMETER_RANGE', payload: { filterBy: filterValue, searchOn: searchBy, startDate: beginDate, endDate: endingDate }
            })
        }
        // if something besides 'display all' is chosen
        // and a date range is applied dispatch date and search parameters
        else if (searchBy !== 'name' && applyDateFilter) {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            let test = searchBy.split('.');
            dispatch({ type: 'FETCH_SPECIFIC_DATA_WITH_DATE', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1], startDate: beginDate, endDate: endingDate } })
        }
    }

    // dispatch lets us access sagas
    const dispatch = useDispatch();

    // hooks for setting search values
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');    
    const [dateRange, setDateRange] = useState([null, null]);
    const [applyDateFilter, setApplyDateFilter] = useState(false)

    // when the date input changes
    // apply get the date range from the user input
    const handleChange = (dateRange) => {
        setDateRange(dateRange);
        setApplyDateFilter(true);
    };
    

    return (
        <>
        {/* If radar chart with time is selected this component displays
         menu items are populated based on which option
        is chosen from the first select */}
            {displayTimePicker &&
                <>
                 <h3>Display Data in Time Range on Radar Chart</h3>
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
                                    <MenuItem key={logs.id} data='name' value={`${logs.school_name}.name`}>{logs.school_name}</MenuItem>
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
                    <LocalizationProvider dateAdapter={DateFnsAdapter}>
                        <DateRangePicker
                            startText="From"
                            endText="To"
                            value={dateRange}
                            onChange={handleChange}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <Button type="submit" variant="outlined" onClick={fetchInfo} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Submit
                    </Button>
                    </>
                }
                </>
    );
}

            export default SelectRadarWithTime;