import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOverview() {
  console.log("in get charts")




}

function* getFilteredByType(action) {
  const filterBy = action.payload;
  const filteredDemographicData = axios.get(`/api/overviewcharts/type/${filterBy}`);
  yield put({type: 'SET_OVERVIEW', payload: filteredDemographicData.data});
}

function* overviewSaga() {
  yield takeLatest('FETCH_OVERVIEW', getOverview);
  yield takeLatest('FETCH_DEMOGRAPHIC_RESULTS', getFilteredByType);
}

export default overviewSaga;