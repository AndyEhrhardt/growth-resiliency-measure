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

  
  export default overviewReducer;