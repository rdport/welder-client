export const setShowScrollIcon = (showScrollIcon) => {
  return (dispatch) => {
    dispatch({
      type: "toolbar/setShowScrollIcon",
      showScrollIcon
   });
  }
}

