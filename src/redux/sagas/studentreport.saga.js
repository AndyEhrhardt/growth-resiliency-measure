import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLoggedInUserReports(){
  const studentReports = yield axios.get(`api/studentreport`);
  console.log('in fetch logged in user reports')
  yield put({ type: 'FETCH_SELECTED_STUDENT_REPORTS', payload: studentReports.data})
}

function* getReport(action) {
  console.log("in get report");
  console.log('action is', action);
  const studentId = action.payload.id;
  const studentReport = yield axios.get(`/api/studentreport/${studentId}`);
  console.log('results from get', studentReport.data);

  yield put({ type: 'SET_STUDENT_REPORT', payload: studentReport.data });
}

function* addReport(action) {
  console.log('in add report');
  studentId = action.payload.student_id;
  const studentReport = yield axios.post('/api/studentreport');
  yield put({ type: 'FETCH_SELECTED_REPORT', payload: studentId });
}

function* studentReportSaga() {
  yield takeLatest('FETCH_SELECTED_STUDENT_REPORTS', getReport);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('FETCH_USER_REPORTS', fetchLoggedInUserReports)
}

export default studentReportSaga;