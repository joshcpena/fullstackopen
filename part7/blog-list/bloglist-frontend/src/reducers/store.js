import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';

const store = createStore(
  combineReducers(
    {
      notification: notificationReducer,
      blogs: blogReducer,
      user: userReducer,
      comment: commentReducer,
    },
  ),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
export default store;
