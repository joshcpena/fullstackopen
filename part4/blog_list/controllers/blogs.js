const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'toekn missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    author: body.author || '',
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });
  const result = await blog.save();
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return response.json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(result);
});

module.exports = blogsRouter;
