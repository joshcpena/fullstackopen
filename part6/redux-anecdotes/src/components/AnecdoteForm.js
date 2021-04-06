import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    // dispatch(createAnecdote(content));
    // dispatch(setMessage(`you added: '${content}'`, 5));
    props.createAnecdote(content);
    props.setMessage(`you added: '${content}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default connect(null, { createAnecdote, setMessage })(AnecdoteForm);
