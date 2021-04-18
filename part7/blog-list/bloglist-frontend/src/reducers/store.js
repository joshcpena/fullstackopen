import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';

const store = createStore(
  combineReducers(
    { notification: notificationReducer, blogs: blogReducer },
  ),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
export default store;
