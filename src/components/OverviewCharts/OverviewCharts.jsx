import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayRadarChart from './DisplayRadarChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DisplayGainsFilters from './DisplayGainsFilters';
import SelectRadarChart from './SelectRadarChart';
import SelectRadarWithTime from './SelectRadarWithTime';
import DisplayGainsChart from './DisplayGainsChart';
import Pdf from "react-to-pdf";
import ChartLegend from '../ChartLegend/ChartLegend'

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
    const defaultSelection = 'name';
    const [searchBy, setSearchBy] = useState('name');
    const [displayTimePicker, setDisplayTimePicker] = useState(false);
    const [displayGainsView, setDisplayGainsView] = useState(false);
    const [displayMainFilter, setDisplayMainFilter] = useState(true);
    const defaultFilter = 'school';

    const [applyDateFilter, setApplyDateFilter] = useState(false);


    // functions to change state of 
    // components to render on selection

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
    // ref for displaying PDF 
    const ref = React.createRef();
    const pdfOptions = {
        orientation: 'landscape',
        unit: 'px',
        format: [800, 350]
    };
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
            <div ref={ref} className="chart-and-legend-container">
                <ChartLegend />
                <div className="chart-container">
                    {displayMainFilter &&
                        <DisplayRadarChart results={filter} />
                    }
                    {displayTimePicker &&
                        <DisplayRadarChart results={filter} />
                    }
                    {displayGainsView &&
                        <DisplayGainsChart results={filter} />}
                </div>
            </div>
            <Pdf options={pdfOptions} targetRef={ref} filename={"Chart PDF"}>
                {({ toPdf }) => <Button onClick={toPdf}>Generate Pdf</Button>}
            </Pdf>
        </div>
    );
}

export default OverviewCharts;