import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getDemographics() {
  console.log("in get district school saga")




}

function* demographicsSaga() {
  yield takeLatest('FETCH_DISTRICT_SCHOOL', getDemographics);
}

export default demographicsSaga;