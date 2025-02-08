const initialState = {
  authLoading: false,
  isAuthenticatedRedux: false,
  authError: null,
  // showAuthError: false
}

function authReducer( state = initialState, action ) {
  switch(action.type) {
    case 'auth/setAuthLoading':
      return { ...state, authLoading: action.authLoading };
    case 'auth/setIsAuthenticatedRedux':
      return { ...state, isAuthenticatedRedux: action.isAuthenticatedRedux };
    case 'auth/setAuthError':
      return { ...state, authError: action.authError };
    case 'auth/setShowAuthError':
      return { ...state, showAuthError: action.showAuthError };
    default:
      return state;
  }
}

export default authReducer;
