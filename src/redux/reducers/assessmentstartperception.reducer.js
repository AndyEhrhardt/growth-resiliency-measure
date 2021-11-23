const assessmentStartPerception = (state = [], action) => {
    switch (action.type) {
      case 'SET_ASSESSMENT_PERCEPTION_START':
        return action.payload;
      case 'CLEAR_ASSESSMENT_PERCEPTION_START':
        return [];
      default:
        return state;
    }
  };

  
  export default assessmentStartPerception;