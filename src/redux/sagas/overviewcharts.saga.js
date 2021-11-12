import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFilteredByTypeRange(action) {
  console.log('in get filtered by range', action.payload[0]);
  const targetDateStart = action.payload[1].startDate; // i.e. '2021-11-10'
  const targetDateEnd = action.payload[2].endDate // i.e. '2021-11-12'
  console.log('start, end', targetDateStart, targetDateEnd);
  
  const filterBy = action.payload[0]; // i.e. {race: 'name'}
  const target = filterBy[Object.keys(filterBy)[0]]; // i.e. name
  const param = Object.keys(filterBy)[0]; // i.e. race
  console.log('target,param', target,param);
  
  const filteredByQuarter = yield axios.get(`/api/overviewcharts/range/?type=${param}&target=${target}&targetStartDate=${targetDateStart}&targetEndDate=${targetDateEnd}`);
  console.log('get result', filteredByQuarter.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByQuarter.data });
}

function* getFilteredByTypeQuarter(action) {
  console.log('in get filtered by quarter', action.payload);
  const filterBy = action.payload[0]; // i.e. {race: 'name'}
  const targetQuarterStart = `q${action.payload[1].quarter}`; // i.e. q1
  const targetQuarterEnd = `q${(parseInt(action.payload[1].quarter) + 1)}` // i.e. q2
  const target = filterBy[Object.keys(filterBy)[0]]; // i.e. name
  const param = Object.keys(filterBy)[0]; // i.e. race
  const filteredByQuarter = yield axios.get(`/api/overviewcharts/quarter/?type=${param}&target=${target}&quarterStart=${targetQuarterStart}&quarterEnd=${targetQuarterEnd}`);
  console.log('get result', filteredByQuarter.data);
  yield put({ type: 'SET_OVERVIEW', payload: filteredByQuarter.data });
}

function* getFilteredByType(action) {
  const filterBy = action.payload;
  const param = Object.keys(filterBy);
  const target = filterBy[Object.keys(filterBy)[0]];
  console.log('in get filtered by type', param);
  console.log('in get filtered target', target);
  const filteredData = yield axios.get(`/api/overviewcharts/type?type=${param}&target=${target}`);
  console.log('result', filteredData.data);

  yield put({ type: 'SET_OVERVIEW', payload: filteredData.data });
}

function* overviewSaga() {
  yield takeLatest('FETCH_PARAMETER_RESULTS', getFilteredByType),
    yield takeLatest('FETCH_PARAMETER_QUARTER', getFilteredByTypeQuarter),
    yield takeLatest('FETCH_PARAMETER_RANGE', getFilteredByTypeRange)
}

export default overviewSaga;