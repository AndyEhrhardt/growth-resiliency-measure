const assessmentUserReducer = (state = {}, action) => {
    switch (action.type) {
    case 'SET_ASSESSMENT_USER':
        return action.payload;
    default:
        return state;
    }
};


export default assessmentUserReducer;