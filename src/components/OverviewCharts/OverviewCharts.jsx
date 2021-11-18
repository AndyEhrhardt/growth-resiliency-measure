import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayRadarChart from './DisplayRadarChart';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DisplayGainsFilters from './DisplayGainsFilters';



function OverviewCharts() {




    // const baseClassName = 'react-daterange-picker';
    // const outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];
    // const allViews = ['century', 'decade', 'year', 'month'];
    // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));


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
    const filter = useSelector(store => store.overview.overviewReducer);
    const schoolInfo = useSelector(store => store.districtSchool);
    const demographics = useSelector(store => store.demographics);


    // once the submit button is clicked dispatch
    // desired information to overview charts
    const fetchInfo = () => {
        console.log("date info", dateRange);
        console.log("search by", searchBy);
        console.log('apply date filter', applyDateFilter);


        if (applyDateFilter && searchBy === "name") {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            console.log("begin date", beginDate);
            dispatch({
                type: 'FETCH_PARAMETER_RANGE', payload: { filterBy: filterValue, searchOn: searchBy, startDate: beginDate, endDate: endingDate }
            })
        }
        else if (searchBy === 'name') {
            dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: { filterBy: filterValue, searchOn: searchBy } });
        }
        else if (searchBy !== 'name' && applyDateFilter) {
            let beginDate = moment(dateRange[0]).format("YYYY MM DD");
            let endingDate = moment(dateRange[1]).format("YYYY MM DD");
            let test = searchBy.split('.');
            dispatch({ type: 'FETCH_SPECIFIC_DATA_WITH_DATE', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1], startDate: beginDate, endDate: endingDate } })
        }
    
        else {
            let test = searchBy.split('.');
            dispatch({ type: 'FETCH_SPECIFIC_DATA', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1] } });
        }

        console.log('value', dateRange)

    }

    // on page load get the list of schools
    // and demographic options to display
    // on drop down selections
    useEffect(() => {
        dispatch({ type: 'FETCH_DISTRICT_SCHOOL' });
        dispatch({ type: 'FETCH_DEMOGRAPHICS' });
        dispatch({ type: 'GET_YEARS_FROM_ASSESSMENTS' });
    }, [dispatch]);

    // hooks to hold the selections to display
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const defaultSelection = 'name';
    const defaultFilter = 'school';
    const [dateRange, setDateRange] = useState([null, null]);
    const [applyDateFilter, setApplyDateFilter] = useState(false);
    const [displayTimePicker, setDisplayTimePicker] = useState(false);
    const [displayGainsView, setDisplayGainsView] = useState(false);
    const [displayMainFilter, setDisplayMainFilter] = useState(false);

    const handleChange = (dateRange) => {
        setDateRange(dateRange);
        setApplyDateFilter(true);
    };

    const changeTimeRangeDisplay = () => {
        setDisplayTimePicker(!displayTimePicker);
        setDisplayGainsView(false);
        setMainFilter(false);
    }

    const changeQuarterRangeDisplay = () => {
        setDisplayGainsView(!displayGainsView);
        setDisplayTimePicker(false);
        setDisplayMainFilter(false);
    }

    const changeMainFilterDisplay = () => {
        setDisplayMainFilter(!displayMainFilter);
        setDisplayTimePicker(false);
        setDisplayGainsView(false);
    }


    return (
        <div>
            {/* {JSON.stringify(schoolInfo)} */}
            {/* {JSON.stringify(demographics)} */}
            <Box sx={{ minWidth: 120 }}>
                {displayMainFilter &&
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
                </>
                }
                <br />
                <DisplayGainsFilters displayGainsView={displayGainsView}
                    defaultSelection={defaultSelection}
                    schoolInfo={schoolInfo}
                    demographics={demographics}
                    filterValue={filterValue}
                    fetchInfo={fetchInfo} />
                {displayTimePicker &&
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
                }

                <Stack direction="row">
                <Button variant="outlined" onClick={changeMainFilterDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Select Radar Chart
                    </Button>
                    <Button variant="outlined" onClick={changeQuarterRangeDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Select Gains Over Time
                    </Button>
                    <Button variant="outlined" onClick={changeTimeRangeDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Select Radar Chart With Time
                    </Button>
                    <Button type="submit" variant="outlined" onClick={fetchInfo} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Submit
                    </Button>
                </Stack>

            </Box>
            <DisplayRadarChart results={filter} />
        </div>
    );
}

export default OverviewCharts;