import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* putVerifyUser(action) {
  console.log("in put verify user saga");
  try {
    const ranString = action.payload;
    yield axios.put(`/api/verifyUser/${ranString}`);
  } catch(error) {
      console.log("Error verifying user", error);
  }




}

function* verifyUserSaga() {
  yield takeLatest('PUT_VERIFY_USER', putVerifyUser);
}

export default verifyUserSaga;