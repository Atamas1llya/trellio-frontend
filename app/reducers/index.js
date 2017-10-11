import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// reducerts

import token from './token';
import modals from './modals';

export default combineReducers({
  routing: routerReducer,
  token,
  modals,
});
