import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getDistrictSchool(action) {

  try{
  console.log("in get district school saga", action.payload)
  const response = yield axios.get('/api/districtschool');
  console.log("in getDistricSchool", response.data);
  yield put({type:'SET_DISTRICT_SCHOOL', payload: response.data});
}catch(error){
  console.log("Failed in getting districtSchool data", error);
}
}

function* districtSchoolSaga() {
  yield takeLatest('FETCH_DISTRICT_SCHOOL', getDistrictSchool);
}

export default districtSchoolSaga;