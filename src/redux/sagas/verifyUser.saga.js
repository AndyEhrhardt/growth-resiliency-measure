import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* putVerifyUser(action) {
  console.log("in put verify user saga");
  try {
    const ranString = action.payload;
    yield axios.put(`/api/verifyUser/email/${ranString}`);
  } catch(error) {
      console.log("Error verifying user", error);
  }
}

function* getStartAssessment(action){
  console.log("in put start assessment saga");
  try {
    const ranString = action.payload;
    const response = yield axios.get(`/api/verifyUser/startAssessment/${ranString}`);
    yield put({ type: 'SET_USER', payload: response.data[0] });
  } catch(error) {
      console.log("Error verifying user", error);
  }
}

function* postAssessment(action){

}
function* verifyUserSaga() {
  yield takeLatest('PUT_VERIFY_USER', putVerifyUser);
  yield takeLatest('GET_START_ASSESSMENT', getStartAssessment);
  yield takeLatest('POST_ASSESSMENT', postAssessment);
}

export default verifyUserSaga;