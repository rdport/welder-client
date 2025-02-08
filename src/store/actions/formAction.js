export const setIsDatabaseChanged = (isDatabaseChanged) => {
  return (dispatch) => {
    dispatch({
      type: "form/setIsDatabaseChanged",
      isDatabaseChanged
   });
  }
}

export const setIsRearrangeMode = (isRearrangeMode) => {
  return (dispatch) => {
    dispatch({
      type: "form/setIsRearrangeMode",
      isRearrangeMode 
   });
  }
}

