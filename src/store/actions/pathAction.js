export const setPath = (path) => {
  return (dispatch) => {
   dispatch({
    type: "path/setPath",
    path
   })
  }
}

export const setComponent = (component) => {
  return (dispatch) => {
   dispatch({
    type: "path/setComponent",
    component
   })
  }
}

export const setIsForbidden = (isForbidden) => {
  return (dispatch) => {
   dispatch({
    type: "path/setIsForbidden",
    isForbidden
   })
  }
}  

export const setIsNotFound = (isNotFound) => {
  return (dispatch) => {
   dispatch({
    type: "path/setIsNotFound",
    isNotFound
   })
  }
}

export const setIsNavPathChanged = (isNavPathChanged) => {
  return (dispatch) => {
   dispatch({
    type: "path/setIsNavPathChanged",
    isNavPathChanged
   })
  }
}  

export const setIsSameComponent= (isSameComponent) => {
  return (dispatch) => {
   dispatch({
    type: "path/setIsSameComponent",
    isSameComponent
   })
  }
} 