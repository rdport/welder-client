import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer, pathReducer, searchReducer, formReducer, toolbarReducer } from './reducers';

const rootReducer = combineReducers({
  authReducer,
  pathReducer,
  searchReducer,
  formReducer,
  toolbarReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
