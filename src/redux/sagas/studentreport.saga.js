import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLoggedInUserReports(){
  const studentReports = yield axios.get(`api/studentreport`);
  console.log('in fetch logged in user reports')
  yield put({ type: 'SET_STUDENT_REPORT', payload: studentReports.data})
}

function* getReport(action) {
  console.log("in get report");
  console.log(action.payload)
  console.log('verification string', action.payload);
  const verification_string = action.payload;
  const studentReport = yield axios.get(`/api/studentreport/${verification_string}`);
  console.log('results from get', studentReport.data);

  yield put({ type: 'SET_STUDENT_REPORT', payload: studentReport.data });
  
}

function* getAssessmentPerceptionStart(action) {
  console.log("in get perception report");
  console.log(action.payload)
  console.log('verification string', action.payload);
  const verification_string = action.payload;
  const studentReport = yield axios.get(`/api/studentreport/perception/${verification_string}`);
  console.log('results from perception get', studentReport.data);

  yield put({ type: 'SET_ASSESSMENT_PERCEPTION_START', payload: studentReport.data });
}

function* addReport(action) {
  console.log('in add report');
  studentId = action.payload.student_id;
  const studentReport = yield axios.post('/api/studentreport');
  yield put({ type: 'FETCH_SELECTED_REPORT', payload: studentId })
}

function* studentReportSaga() {
  yield takeLatest('FETCH_SELECTED_STUDENT_REPORTS', getReport);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('FETCH_USER_REPORTS', fetchLoggedInUserReports);
  yield takeLatest('FETCH_ASSESSMENT_PERCEPTION_START', getAssessmentPerceptionStart);
}

export default studentReportSaga;