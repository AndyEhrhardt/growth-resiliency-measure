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

function* demographicsSaga() {
  yield takeLatest('FETCH_DEMOGRAPHICS', getDemographics);
}

export default demographicsSaga;