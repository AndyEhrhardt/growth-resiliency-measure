const demographicsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DEMOGRAPHICS':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default demographicsReducer;