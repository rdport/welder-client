const initialState = {
  term: '',
  key: '',
  year: '',
  month: '',
  day: '',
  order: '',
  page: 1,
  limit: 20,
  isPressed: false,
  noSearchBar: false,
}

function searchReducer( state = initialState, action ) {
  switch(action.type) {
    case 'search/setTerm':
      return { ...state, term: action.term };
    case 'search/setKey':
      return { ...state, key: action.key };
    case 'search/setYear':
      return { ...state, year: action.year };
    case 'search/setMonth':
      return { ...state, month: action.month };
    case 'search/setDay':
      return { ...state, day: action.day };
    case 'search/setOrder':
      return { ...state, order: action.order };
    case 'search/setPage':
      return { ...state, page: action.page };
    case 'search/setIsPressed':
      return { ...state, isPressed: action.isPressed };
    case 'search/setNoSearchBar':
      return { ...state, noSearchBar: action.noSearchBar };
    default:
      return state;
  }
}

export default searchReducer;
