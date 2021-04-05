import { createStore, combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './anecdoteReducer';
import notificationReducer from './notificationReducer';
import filterReducer from './filterReducer';

const store = createStore(
  combineReducers(
    { anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer },
  ),
  composeWithDevTools(),
);

export default store;
