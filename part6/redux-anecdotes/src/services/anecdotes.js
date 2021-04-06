import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const incrementAnecdoteVote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseURL}/${anecdote.id}`, newAnecdote);
  return response.data;
};

export default { getAll, createNew, incrementAnecdoteVote };
