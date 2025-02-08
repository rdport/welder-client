const initialState = {
  isDatabaseChanged: false,
  isRearrangeMode: false,
}

function formReducer( state = initialState, action ) {
  switch(action.type) {
    case 'form/setIsDatabaseChanged':
      return { ...state, isDatabaseChanged: action.isDatabaseChanged };
    case 'form/setIsRearrangeMode':
      return { ...state, isRearrangeMode: action.isRearrangeMode };
    default:
      return state;
  }
}

export default formReducer;
