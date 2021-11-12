import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { AlignVerticalTopSharp } from '@mui/icons-material';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* postStudent(action){
  console.log("in post student", action.payload);
  try {
    yield axios.post('/api/user/addstudent', action.payload);
    yield put({type: 'FETCH_STUDENTS'});
  } catch (error){
    console.log("error in post student", error)
  }

}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('POST_STUDENT', postStudent);
}

export default registrationSaga;
