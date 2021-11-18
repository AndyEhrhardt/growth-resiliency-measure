import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFilteredByTypeRange(action) {
  console.log('in get filtered by range', action.payload);
  const startDate = action.payload.startDate; // i.e. '2021-11-10'
  const endDate = action.payload.endDate // i.e. '2021-11-12'
  const filterBy = action.payload.filterBy; // i.e. race
  const searchOn = action.payload.searchOn; // i.e. name
  const filteredByQuarter = yield axios.get(`/api/overviewcharts/range/?filterBy=${filterBy}&searchOn=${searchOn}&startDate=${startDate}&endDate=${endDate}`);
  console.log('get result', filteredByQuarter.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByQuarter.data });
}

function* getFilteredByTypeQuarter(action) {
  console.log('in get filtered by quarter', action.payload);
  const targetQuarterStart = `q${action.payload.quarter}`;
  const targetQuarterEnd = `q${action.payload.quarter+1}`; // i.e. q2
  const filterBy = action.payload.filterBy; // i.e. race
  const searchOn = action.payload.searchOn; // i.e. name
  const filteredByQuarter = yield axios.get(`/api/overviewcharts/quarter/?filterBy=${filterBy}&searchOn=${searchOn}&quarterStart=${targetQuarterStart}&quarterEnd=${targetQuarterEnd}`);
  console.log('get result', filteredByQuarter.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByQuarter.data });
}

function* getFilteredByType(action) {
  const filterBy = action.payload.filterBy;
  const searchOn = action.payload.searchOn;
  const filteredData = yield axios.get(`/api/overviewcharts/type?filterBy=${filterBy}&searchOn=${searchOn}`);
  console.log('result', filteredData.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredData.data });
}

function* getSpecificData(action){
  console.log('in get specific data saga', action.payload);
  
  const filterBy = action.payload.filterBy;
  const searchOn = action.payload.searchOn;
  const searchParameter = action.payload.searchParameter;
  const filteredData = yield axios.get(`/api/overviewcharts/specific?filterBy=${filterBy}&searchOn=${searchOn}&searchParameter=${searchParameter}`);
  console.log('result', filteredData.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredData.data });
}

function* getSpecificDataWithDate(action){
  console.log('in get specific data with date saga', action.payload);
  const filterBy = action.payload.filterBy;
  const searchOn = action.payload.searchOn;
  const searchParameter = action.payload.searchParameter;
  const startDate = action.payload.startDate; // i.e. '2021-11-10'
  const endDate = action.payload.endDate // i.e. '2021-11-12'
  const filteredData = yield axios.get(`/api/overviewcharts/specificWithDate?filterBy=${filterBy}&searchOn=${searchOn}&searchParameter=${searchParameter}&startDate=${startDate}&endDate=${endDate}`);
  console.log('result', filteredData.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredData.data });
}

function* getAssessmentYears(){
  const assessmentYears = yield axios.get(`/api/overviewcharts/assessmentYears`);
  console.log('result', assessmentYears.data);
  yield put({ type: 'SET_ASSESSMENT_YEARS', payload: assessmentYears.data });
}

function* overviewSaga() {
  yield takeLatest('FETCH_PARAMETER_RESULTS', getFilteredByType),
    yield takeLatest('FETCH_PARAMETER_QUARTER', getFilteredByTypeQuarter),
    yield takeLatest('FETCH_PARAMETER_RANGE', getFilteredByTypeRange),
    yield takeLatest('FETCH_SPECIFIC_DATA', getSpecificData);
    yield takeLatest('FETCH_SPECIFIC_DATA_WITH_DATE', getSpecificDataWithDate);
    yield takeLatest('GET_YEARS_FROM_ASSESSMENTS', getAssessmentYears);
}

export default overviewSaga;