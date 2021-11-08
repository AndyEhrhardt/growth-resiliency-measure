const studentReportReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_STUDENT_REPORT':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default studentReportReducer;