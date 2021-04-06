import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) => state.anecdotes);
  // const filter = useSelector((state) => state.filter);
  // const dispatch = useDispatch();
  const { anecdotes, filter } = props;
  const vote = (ancedote) => {
    // dispatch(incrementVote(ancedote));
    // dispatch(setMessage(`you voted ${ancedote.content}`, 5));
    props.incrementVote(ancedote);
    props.setMessage(`you voted ${ancedote.content}`, 5);
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
              {' '}
              {anecdote.votes}
              <button type="button" onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  incrementVote: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  anecdotes: state.anecdotes,
});

export default connect(mapStateToProps, { incrementVote, setMessage })(AnecdoteList);
