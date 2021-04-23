import axios from 'axios';

const baseUrl = '/api/comments';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addComment = async (commentObj) => {
  const response = await axios.post(baseUrl, commentObj);
  return response.data;
};

export default {
  getAll, addComment,
};
