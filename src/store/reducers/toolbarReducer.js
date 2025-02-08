const initialState = {
  showSrollIcon: false,
}

function toolbarReducer( state = initialState, action ) {
  switch(action.type) {
    case 'toolbar/setShowScrollIcon':
      return { ...state, showScrollIcon: action.showScrollIcon };
    default:
      return state;
  }
}

export default toolbarReducer;
