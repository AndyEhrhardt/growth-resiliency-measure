import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// saga to get reports for logged in user
function* fetchLoggedInUserReports(){
  const studentReports = yield axios.get(`api/studentreport`);
  yield put({ type: 'SET_STUDENT_REPORT', payload: studentReports.data})
}

// saga to get student report by matching verification string
function* getReport(action) {
  const verification_string = action.payload;
  const studentReport = yield axios.get(`/api/studentreport/${verification_string}`);
  yield put({ type: 'SET_STUDENT_REPORT', payload: studentReport.data });
}

// saga to add new report for student
function* addReport(action) {
  studentId = action.payload.student_id;
  const studentReport = yield axios.post('/api/studentreport');
  yield put({ type: 'FETCH_SELECTED_REPORT', payload: studentId })
}

function* studentReportSaga() {
  yield takeLatest('FETCH_SELECTED_STUDENT_REPORTS', getReport);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('FETCH_USER_REPORTS', fetchLoggedInUserReports)
}

export default studentReportSaga;