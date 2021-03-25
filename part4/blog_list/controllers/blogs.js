const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    author: request.body.author || '',
    title: request.body.title,
    likes: request.body.likes || 0,
    url: request.body.url,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });
  const result = await blog.save();
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  response.json(result);
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
