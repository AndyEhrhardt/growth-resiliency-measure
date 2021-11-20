const studentReportReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STUDENT_REPORT':
        return action.payload;
      case 'CLEAR_STUDENT_REPORT':
        return [];
      default:
        return state;
    }
  };

  
  export default studentReportReducer;