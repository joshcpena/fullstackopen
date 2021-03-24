const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    author: request.body.author || '',
    title: request.body.title,
    likes: request.body.like || 0,
    url: request.body.url,
  });
  const result = await blog.save();
  response.json(result);
});

module.exports = blogsRouter;
