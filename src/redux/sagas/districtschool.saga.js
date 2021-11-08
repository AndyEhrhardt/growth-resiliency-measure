import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getDistrictSchool() {
  console.log("in get district school saga")




}

function* districtSchoolSaga() {
  yield takeLatest('FETCH_DISTRICT_SCHOOL', getDistrictSchool);
}

export default districtSchoolSaga;