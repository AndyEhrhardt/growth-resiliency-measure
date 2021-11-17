const assessmentUserReducer = (state = {}, action) => {
    switch (action.type) {
    case 'SET_ASSESSMENT_USER':
        return action.payload;
    case 'EDIT_USER_GENDER':
        return {...state, gender_id: action.payload};
    case 'EDIT_USER_RACE':
        return {...state, race_id: action.payload};
    case 'EDIT_USER_HISPLAT':
        return {...state, hispanic_latino: action.payload};    
    case 'EDIT_USER_IEP':
        return {...state, iep: action.payload}; 
    case 'EDIT_USER_GRADE':
        return {...state, grade: action.payload};
    default:
        return state;
    }
};


export default assessmentUserReducer;