const initialState = {
  gender: [],
  race: []
}


const demographicsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DEMOGRAPHICS':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default demographicsReducer;