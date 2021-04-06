import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import anecdoteReducer from './anecdoteReducer';
import notificationReducer from './notificationReducer';
import filterReducer from './filterReducer';

const store = createStore(
  combineReducers(
    { anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer },
  ),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
