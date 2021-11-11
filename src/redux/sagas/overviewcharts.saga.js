import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFilteredByTypeRange(action) {
  const filterByParameter = action.payload.parameter;
  const filterByRangeStart = action.payload.start;
  const filterByRangeEnd = action.payload.end;
  const filteredByRange = axios.get(`/api/overviewcharts/type/${filterByParameter}/${filterByRangeStart}/${filterByRangeEnd}`);
  yield put({type: 'SET_OVERVIEW', payload: filteredByRange.data});
}

function* getFilteredByTypeQuarter(action) {
  const filterByParameter = action.payload.parameter;
  const filterTargetQuarter = action.payload.quarter;
  const filteredByQuarter = axios.get(`/api/overviewcharts/type/${filterByParameter}/${filterTargetQuarter}`);
  yield put({type: 'SET_OVERVIEW', payload: filteredByQuarter.data});
}

function* getFilteredByType(action) {
  const filterBy = action.payload;
  const filteredData = axios.get(`/api/overviewcharts/type/${filterBy}`);
  yield put({type: 'SET_OVERVIEW', payload: filteredData.data});
}

function* overviewSaga() {
  yield takeLatest('FETCH_OVERVIEW', getOverview);
  yield takeLatest('FETCH_PARAMETER_RESULTS', getFilteredByType);
  yield takeLatest('FETCH_PARAMETER_QUARTER', getFilteredByTypeQuarter),
  yield takeLatest('FETCH_PARAMETER_RANGE', getFilteredByTypeRange)
}

export default overviewSaga;