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

function* getGainsByQuarter(action){
  const beginQ1 = action.payload.beginQ1;
  const endQ1 = action.payload.endQ1; // i.e. q2
  const beginQ2 = action.payload.beginQ2 // i.e. q3
  const endQ2 = action.payload.endQ2; // i.e. q4
  const filterBy = action.payload.filterBy; // i.e. race
  const searchOn = action.payload.searchOn; // i.e. name
  const searchParameter = action.payload.searchParameter;
  const firstYearSelected = action.payload.firstYearSelected;
  const secondYearSelected = action.payload.secondYearSelected;
  console.log('in get gains saga', beginQ1)
  const gainsByQuarter = yield axios.get(`/api/overviewcharts/gains/?filterBy=${filterBy}&searchOn=${searchOn}&searchParameter=${searchParameter}&q1Start=${beginQ1}&q1End=${endQ1}&q2Start=${beginQ2}&q2End=${endQ2}&firstYearSelected=${firstYearSelected}&secondYearSelected=${secondYearSelected}`);
  console.log('get result', getGainsByQuarter.data);
  yield put({ type: 'SET_OVERVIEW', payload: gainsByQuarter.data });
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
    yield takeLatest('GET_GAINS_BY_QUARTER', getGainsByQuarter)
}

export default overviewSaga;