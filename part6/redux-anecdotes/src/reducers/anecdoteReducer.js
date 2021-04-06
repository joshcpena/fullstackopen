// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// });

// const initialState = anecdotesAtStart.map(asObject);
import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'INCREMENT_VOTE': {
      const updatedAncedote = action.data;
      return state
        .map((ancedote) => (ancedote.id !== updatedAncedote.id ? ancedote : updatedAncedote))
        .sort((a, b) => b.votes - a.votes);
    }
    case 'CREATE_ANECDOTE': {
      return state
        .concat(action.data)
        .sort((a, b) => b.votes - a.votes);
    }
    case 'INIT_ANECDOTES': {
      return action.data;
    }
    default:
      return state;
  }
};

export const incrementVote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdoteService.incrementAnecdoteVote(anecdote);
  dispatch({
    type: 'INCREMENT_VOTE',
    data: newAnecdote,
  });
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch({
    type: 'CREATE_ANECDOTE',
    data: newAnecdote,
  });
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  });
};

export default anecdoteReducer;
