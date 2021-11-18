import { combineReducers } from "redux";

const overviewReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_OVERVIEW':
        return action.payload;
      case 'UNSET_OVERVIEW':
        return [];
      default:
        return state;
    }
  };

  const yearReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ASSESSMENT_YEARS':
        return action.payload;
      case 'UNSET_ASSESSMENT_YEARS':
        return [];
        default:
        return state;
    }
  };

  
  export default combineReducers({ 
    overviewReducer,
    yearReducer,
  });