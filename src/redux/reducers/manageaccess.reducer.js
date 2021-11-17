const manageAccessReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MANAGE_ACCESS':
        return action.payload;
      default:
        return state;
    }
  };

  
  export default manageAccessReducer;