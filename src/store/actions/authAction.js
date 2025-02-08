export const setAuthLoading = (authLoading) => {
  return (dispatch) => {
    dispatch({
      type: "auth/setAuthLoading",
      authLoading
   })
  }
}  

export const setIsAuthenticatedRedux = (isAuthenticatedRedux) => {
  return (dispatch) => {
    dispatch({
      type: "auth/setIsAuthenticatedRedux",
      isAuthenticatedRedux
   })
  }
}

export const setAuthError = (authError) => {
  return (dispatch) => {
    dispatch({
      type: "auth/setAuthError",
      authError
   })
  }
}

export const setShowAuthError = (showAuthError) => {
  return (dispatch) => {
    dispatch({
      type: "auth/setShowAuthError",
      showAuthError
   })
  }
} 
