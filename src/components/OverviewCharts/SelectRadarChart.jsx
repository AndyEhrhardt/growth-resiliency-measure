import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function SelectRadarChart({ displayMainFilter, defaultSelection, schoolInfo, demographics }) {

    // hooks for search and filter selections
    const [filterValue, setFilterValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    // dispatch component from react-redux to access sagas
    const dispatch = useDispatch();

    // dispatch search by 'name' if display all is selected
    // otherwise get parameter selected
    const getInfo = () => {
        if (searchBy === 'name') {
        dispatch({ type: 'FETCH_PARAMETER_RESULTS', payload: { filterBy: filterValue, searchOn: searchBy } });
    } 
        else {
            let test = searchBy.split('.');
            dispatch({ type: 'FETCH_SPECIFIC_DATA', payload: { filterBy: filterValue, searchOn: test[0], searchParameter: test[1] } });
    }
}
    return (
        <>
        {/* If display main filter is selected this component displays
         menu items are populated based on which option
        is chosen from the first select */}
            {displayMainFilter &&
                <>
                <h3>Display Data on Radar Chart</h3>
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
                            <MenuItem key="school" value={'school'}>School</MenuItem>
                            <MenuItem key="district" value={'district'}>District</MenuItem>
                            <MenuItem key="race" value={'race'}>Race</MenuItem>
                            <MenuItem key="gender" value={'gender'}>Gender</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="select-label">Choose</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            label="Filter By"
                            onChange={event => setSearchBy(event.target.value)}
                            width='20%'
                            defaultValue='name'

                        >
                            <MenuItem key="display_all" value={defaultSelection}>Display All</MenuItem>
                            {filterValue == 'school' &&
                                schoolInfo.map((logs) => (
                                    <MenuItem data='name' key={logs.id} value={`${logs.school_name}.name`}>{logs.school_name}</MenuItem>
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
         
                    <Button type="submit" variant="outlined" onClick={event=> getInfo()} sx={{ m: 1, minWidth: 120, height: 30, mt: 2 }} >
                        Submit 
                    </Button>
                    
                </>
                
            }
        </>
    )
}

export default SelectRadarChart;