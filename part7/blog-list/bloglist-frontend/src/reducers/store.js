import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';

const store = createStore(
  combineReducers(
    { notification: notificationReducer, blogs: blogReducer, user: userReducer },
  ),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
export default store;
