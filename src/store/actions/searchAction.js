export const setTerm = (term) => {
  return (dispatch) => {
    dispatch({
      type: "search/setTerm",
      term
   })
  }
}  

export const setKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: "search/setKey",
      key
   })
  }
}

export const setYear = (year) => {
  return (dispatch) => {
    dispatch({
      type: "search/setYear",
      year
   })
  }
}

export const setMonth = (month) => {
  return (dispatch) => {
    dispatch({
      type: "search/setMonth",
      month
   })
  }
}

export const setDay = (day) => {
  return (dispatch) => {
    dispatch({
      type: "search/setDay",
      day
   })
  }
}

export const setOrder = (order) => {
  return (dispatch) => {
    dispatch({
      type: "search/setOrder",
      order
   })
  }
}

export const setPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: "search/setPage",
      page
   })
  }
}

export const setIsPressed = (isPressed) => {
  return (dispatch) => {
    dispatch({
      type: "search/setIsPressed",
      isPressed
   })
  }
}

export const setNoSearchBar = (noSearchBar) => {
  return (dispatch) => {
    console.log(noSearchBar)
    dispatch({
      type: "search/setNoSearchBar",
      noSearchBar
   })
  }
}

export const resetSearchBar = () => {
  return (dispatch) => {
    dispatch(setTerm(''));
    // dispatch(setKey(''));
    dispatch(setYear(''));
    dispatch(setMonth(''));
    dispatch(setDay(''));
    dispatch(setOrder(''));
    dispatch(setPage(1));
    dispatch(setIsPressed(false));
  }
}
