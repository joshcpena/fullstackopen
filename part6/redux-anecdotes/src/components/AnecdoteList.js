import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (ancedote) => {
    dispatch(incrementVote(ancedote.id));
    dispatch(setMessage(`you voted ${ancedote.content}`));
    setTimeout(() => dispatch(setMessage('')), 5000);
  };

  return (
    <div>
      {anecdotes
        .filter((a) => a.content.toLowerCase().includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {anecdote.votes}
              <button type="button" onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
