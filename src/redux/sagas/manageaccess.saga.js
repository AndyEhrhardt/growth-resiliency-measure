import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getUserHasAccess() {

  try{
  console.log("in get user with access levels ")
  const response = yield axios.get('/api/verifyUser/hasaccess');
  console.log("in get users", response.data);
  yield put({type:'SET_MANAGE_ACCESS', payload: response.data});
}catch(error){
  console.log("Failed in getting districtSchool data", error);
}
}


function* hasAccessSaga() {
    yield takeLatest('FETCH_HAS_ACCESS', getUserHasAccess);
   
  }
  
  export default hasAccessSaga;