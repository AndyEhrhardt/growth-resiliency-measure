import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getReport(action) {
  console.log("in get report")
  const studentId = action.payload;
  const studentReport = yield axios.get(`/api/studentreport/${id}`);
  yield put({ type: 'SET_REPORT', payload: studentReport.data });
}

function* addReport(action) {
  console.log('in add report');
  const studentReport = yield axios.post('/api/studentreport');
  yield put({ type: 'FETCH_REPORT', payload: action.data.id });
}

function* studentReportSaga() {
  yield takeLatest('FETCH_REPORT', getReport);
  yield takeLatest('ADD_REPORT', addReport);
}

export default studentReportSaga;