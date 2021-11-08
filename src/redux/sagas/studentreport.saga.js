import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getReport() {
  console.log("in get report")




}

function* studentReportSaga() {
  yield takeLatest('FETCH_REPORT', getReport);
}

export default studentReportSaga;