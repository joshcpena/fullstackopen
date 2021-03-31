import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const saveBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios
    .post(baseUrl, blogObj, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios
    .delete(`${baseUrl}/${blogId}`, config);
  return response;
};

const addLike = async (blogObj) => {
  const url = baseUrl.concat(`/${blogObj.id}`);

  const newBlogObj = {
    user: blogObj.user.id,
    likes: blogObj.likes + 1,
    author: blogObj.author,
    title: blogObj.title,
    url: blogObj.url,
  };

  const response = await axios
    .put(url, newBlogObj);
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, setToken, saveBlog, addLike, deleteBlog,
};
