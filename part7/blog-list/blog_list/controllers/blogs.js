const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const config = require('../utils/config');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
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
  // const result = await blog.save();
  await blog.save();
  const result = await Blog.findById(blog.id).populate('user', { username: 1, name: 1 });

  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return response.json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  // eslint-disable-next-line prefer-destructuring
  const user = request.user;
  // eslint-disable-next-line no-underscore-dangle
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
  } else {
    return response.status(401).json({ error: 'incorrect user, cannot delete this blog' });
  }
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const blog = {
    author: body.author || '',
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
    user: body.user,
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 });

  response.json(result);
});

module.exports = blogsRouter;
