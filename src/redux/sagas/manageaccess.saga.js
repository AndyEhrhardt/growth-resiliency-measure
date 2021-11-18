import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteUserHasAccess(action) {
  console.log("in deleting a user with access", action.payload)
  try {
    yield axios.delete(`/api/verifyUser/hasaccess/${action.payload}`);
    yield put({ type:'FETCH_REQUESTING_AND_HAS_ACCESS'})
  } catch (error) {
    console.log("Error in deleting a user with access", error);
  }
}

function* getRequestingAndHasAccess() {
  try {
    console.log("in requesting access user ")
    const response = yield axios.get('/api/verifyUser/request');
    console.log("in get users", response.data);
    yield put({ type: 'SET_MANAGE_ACCESS', payload: response.data });
  } catch (error) {
    console.log("Failed in requesting access", error);
  }
}

function* addRequestingUserToHasAccess(action){
  const userData = action.payload
  console.log("This is the ID i want to change", userData);
  try{
    yield axios.put(`/api/verifyUser/addAccessUser/${userData.user_id}`, {roleId: userData.role_number});
    yield put({type: 'FETCH_REQUESTING_AND_HAS_ACCESS'})
  }catch(error){
    console.log("Error in adding a requesting user to hasAccess users", error);
  }
}


function* hasAccessSaga() {
  yield takeLatest('REMOVE_USER', deleteUserHasAccess)
  yield takeLatest('FETCH_REQUESTING_AND_HAS_ACCESS', getRequestingAndHasAccess)
  yield takeLatest('ADD_REQUESTING_TO HAS_ACCESS', addRequestingUserToHasAccess)
}






export default hasAccessSaga;
