const districtSchoolReducer = (state = [], action) => {
  console.log(action.payload);
    switch (action.type) {
      case 'SET_DISTRICT_SCHOOL':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default districtSchoolReducer;