import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getUserHasAccess() {

  try {
    console.log("in get user with access levels ")
    const response = yield axios.get('/api/verifyUser/hasaccess');
    console.log("in get users", response.data);
    yield put({ type: 'SET_MANAGE_ACCESS', payload: response.data });
  } catch (error) {
    console.log("Failed in getting districtSchool data", error);
  }
}

function* deleteUserAccess(action) {
  console.log("in deleting a user with access", action.payload)
  try {
    yield axios.delete(`/api/verifyUser/hasaccess/${action.payload}`);
    yield put({ type: 'FETCH_HAS_ACCESS' })

  } catch (error) {
    console.log("Error in deleting a user with access", error);
  }
}

function* getRequestingAccess() {

  try {
    console.log("in requesting access user ")
    const response = yield axios.get('/api/verifyUser/request');
    console.log("in get users", response.data);
    yield put({ type: 'SET_MANAGE_ACCESS', payload: response.data });
  } catch (error) {
    console.log("Failed in requesting access", error);
  }
}


function* hasAccessSaga() {
  yield takeLatest('FETCH_HAS_ACCESS', getUserHasAccess);
  yield takeLatest('REMOVE_USER', deleteUserAccess)
  yield takeLatest('FETCH_REQUESTING_ACCESS', getRequestingAccess)


}






export default hasAccessSaga;
