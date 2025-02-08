const initialState = {
  path: '',
  component: '',
  isForbidden: false,
  isNotFound: false,
  isNavPathChanged: false,
  isSameComponent: false,
}

function pathReducer( state = initialState, action ) {
  switch(action.type) {
    case 'path/setPath':
      return { ...state, path: action.path };
    case 'path/setComponent':
      return { ...state, component: action.component };
    case 'path/setIsForbidden':
      return { ...state, isForbidden: action.isForbidden };
    case 'path/setIsNotFound':
      return { ...state, isNotFound: action.isNotFound };
    case 'path/setIsNavPathChanged':
        return { ...state, isNavPathChanged: action.isNavPathChanged };
    case 'path/setIsSameComponent':
      return { ...state, isSameComponent: action.isSameComponent };
    default:
      return state; 
  }
}

export default pathReducer;
