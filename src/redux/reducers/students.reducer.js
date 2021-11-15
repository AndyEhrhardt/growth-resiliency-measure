const studentsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STUDENTS':
        return action.payload;
      case 'CLEAR_STUDENTS':
        return {};
      default:
        return state;
    }
  };

  
  export default studentsReducer;