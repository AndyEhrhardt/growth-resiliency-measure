import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFilteredByTypeRange(action) {
  console.log('in get filtered by range');
  
  const filterByParameter = action.payload.parameter;
  const filterByRangeStart = action.payload.start;
  const filterByRangeEnd = action.payload.end;
  const filteredByRange = axios.get(`/api/overviewcharts/range/?type=${filterByParameter}&start=${filterByRangeStart}&end=${filterByRangeEnd}`);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByRange.data });
}

function* getFilteredByTypeQuarter(action) {
  console.log('in get filtered by quarter');
  
  const filterByParameter = action.payload.parameter;
  const filterTargetQuarter = action.payload.quarter;
  const filteredByQuarter = axios.get(`/api/overviewcharts/quarter/?type=${filterByParameter}&quarter=${filterTargetQuarter}`);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByQuarter.data });
}

function* getFilteredByType(action) {
  const filterBy = action.payload;
  const param = Object.keys(filterBy);
  const target = filterBy[Object.keys(filterBy)[0]];
  console.log('in get filtered by type', param);
  console.log('in get filtered target', target);
  
  

  const filteredData = axios.get(`/api/overviewcharts/type?type=${param}&target=${target}`);
  yield put({ type: 'SET_OVERVIEW', payload: filteredData.data });
}

function* overviewSaga() {
  yield takeLatest('FETCH_PARAMETER_RESULTS', getFilteredByType),
  yield takeLatest('FETCH_PARAMETER_QUARTER', getFilteredByTypeQuarter),
    yield takeLatest('FETCH_PARAMETER_RANGE', getFilteredByTypeRange)
}

export default overviewSaga;