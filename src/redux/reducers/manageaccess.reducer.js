const initialState = {
  hasAccess: [],
  requesting: []
}


const manageAccessReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MANAGE_ACCESS':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default manageAccessReducer;