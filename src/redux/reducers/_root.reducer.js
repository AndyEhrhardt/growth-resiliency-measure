import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import overview from './overviewcharts.reducer';
import districtSchool from './districtschool.reducer';
import demographics from './demographics.reducer';
import studentReport from './studentreport.reducer';
import students from './students.reducer'
import manageAccess from './manageaccess.reducer';
import assessmentUser from './assessmentuser.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  overview, //overviewReducer and yearReducer
  districtSchool,
  demographics,
  studentReport,
  students,
  manageAccess,
  assessmentUser,
});

export default rootReducer;
