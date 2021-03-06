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
    yield put({ type: 'SET_ASSESSMENT_USER', payload: response.data[0] });
  } catch(error) {
      console.log("Error verifying user", error);
  }
}

function* postAssessment(action){
  console.log("in post assessment", action.payload);
  try {
    console.log("in post assessment", action.payload);


    yield axios.post(`/api/verifyUser/postassessment`, action.payload);

  } catch(error) {
      console.log("Error posting assessment", error);
  }
}

function* sendAssessment(action){
  try {
    console.log(action.payload, "in send assessment saga")
    yield axios.put(`/api/verifyUser/sendassessment`, {data: action.payload});
    yield put({type: 'FETCH_STUDENTS'});
  } catch(error) {
      console.log("Error sending assessment", error);
  }
}
function* verifyUserSaga() {
  yield takeLatest('PUT_VERIFY_USER', putVerifyUser);
  yield takeLatest('GET_START_ASSESSMENT', getStartAssessment);
  yield takeLatest('POST_ASSESSMENT', postAssessment);
  yield takeLatest('SEND_ASSESSMENT', sendAssessment);
}

export default verifyUserSaga;