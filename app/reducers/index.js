import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// reducerts

import token from './token';
import modals from './modals';
import user from './user';
import boards from './boards';
import tasks from './tasks';

import dragndrop from './dragndrop';

export default combineReducers({
  routing: routerReducer,
  token,
  modals,
  user,
  boards,
  tasks,
  dragndrop,
});
