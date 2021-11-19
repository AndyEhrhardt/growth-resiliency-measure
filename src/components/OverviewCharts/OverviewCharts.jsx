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
import SelectRadarChart from './SelectRadarChart';
import SelectRadarWithTime from './SelectRadarWithTime';
import DisplayGainsChart from './DisplayGainsChart';



function OverviewCharts() {

    // access useDispatch from react-redux
    const dispatch = useDispatch();

    // get assessment information from the reducer
    const filter = useSelector(store => store.overview.overviewReducer);
    const schoolInfo = useSelector(store => store.districtSchool);
    const demographics = useSelector(store => store.demographics);

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

    const [applyDateFilter, setApplyDateFilter] = useState(false);
    const [displayTimePicker, setDisplayTimePicker] = useState(false);
    const [displayGainsView, setDisplayGainsView] = useState(false);
    const [displayMainFilter, setDisplayMainFilter] = useState(true);

    const changeTimeRangeDisplay = () => {
        setDisplayTimePicker(!displayTimePicker);
        setDisplayGainsView(false);
        setDisplayMainFilter(false);
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
            <Box sx={{ minWidth: 120 }}>
                <SelectRadarChart displayMainFilter={displayMainFilter}
                    defaultSelection={defaultSelection}
                    schoolInfo={schoolInfo}
                    demographics={demographics}
                    filterValue={filterValue}
                />
                <br />
                <DisplayGainsFilters displayGainsView={displayGainsView}
                    defaultSelection={defaultSelection}
                    schoolInfo={schoolInfo}
                    demographics={demographics}
                    filterValue={filterValue}
                    filter={filter}
                />
                <SelectRadarWithTime
                    displayTimePicker={displayTimePicker}
                    defaultSelection={defaultSelection}
                    schoolInfo={schoolInfo}
                    demographics={demographics}
                    filterValue={filterValue}
                />
                <Stack direction="row">
                
                        <Button variant="outlined" onClick={changeMainFilterDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                            Select Radar Chart
                        </Button>
                    
                    <Button variant="outlined" onClick={changeTimeRangeDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Radar Chart With Time
                    </Button>
                    <Button variant="outlined" onClick={changeQuarterRangeDisplay} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Select Gains Over Time
                    </Button>
                  
                </Stack>
            </Box>
            {displayMainFilter  &&
                <DisplayRadarChart results={filter} />
            }
            {displayTimePicker &&
                <DisplayRadarChart results={filter} />
            }
            {displayGainsView && 
            <DisplayGainsChart results={filter} />}
        </div>
    );
}

export default OverviewCharts;