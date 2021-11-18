import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function SelectRadarWithTime({displayTimePicker, defaultSelection, schoolInfo, demographics}) {

    const fetchInfo = () => {
        if (applyDateFilter && searchBy === "name") {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            console.log("begin date", beginDate);
            dispatch({
                type: 'FETCH_PARAMETER_RANGE', payload: { filterBy: filterValue, searchOn: searchBy, startDate: beginDate, endDate: endingDate }
            })
        }
        else if (searchBy !== 'name' && applyDateFilter) {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            let test = searchBy.split('.');
            dispatch({ type: 'FETCH_SPECIFIC_DATA_WITH_DATE', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1], startDate: beginDate, endDate: endingDate } })
        }
    }

    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    
    const [dateRange, setDateRange] = useState([null, null]);

    const handleChange = (dateRange) => {
        setDateRange(dateRange);
        setApplyDateFilter(true);
    };

    return (
        <>
            {displayTimePicker &&
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