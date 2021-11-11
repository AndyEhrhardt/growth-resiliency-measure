import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOverview() {
  console.log("in get charts")




}

function* getFilteredDemographics(action) {
  const demographicId = action.payload;
  const filteredDemographicData = axios.get(`/api/overviewcharts/demographics/${demographicId}`);
  yield put({type: 'SET_OVERVIEW', payload: filteredDemographicData.data});
}

function* overviewSaga() {
  yield takeLatest('FETCH_OVERVIEW', getOverview);
  yield takeLatest('FETCH_DEMOGRAPHIC_RESULTS', getFilteredDemographics);
}

export default overviewSaga;