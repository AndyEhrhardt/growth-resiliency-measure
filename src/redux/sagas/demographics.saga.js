import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getDemographics() {
  console.log("in get demographics saga")
  try{
    const response = yield axios.get('/api/demographics');
    console.log("in get demographics", response.data);
    yield put({type:'SET_DEMOGRAPHICS', payload: response.data});
  }catch(error){
    console.log("Failed in getting districtSchool data", error);
  }
}

function* putDemographics(action) {
  try {
    const userID = action.payload.student_id;
    const editObject = action.payload;
    yield axios.put(`/api/demographics/demo/${userID}`, editObject);
  } catch(error) {
    console.log('Error updating user demographics', error);
  }
}

function* demographicsSaga() {
  yield takeLatest('FETCH_DEMOGRAPHICS', getDemographics);
  yield takeLatest('PUT_USER_DEMOGRAPHICS', putDemographics);
}

export default demographicsSaga;