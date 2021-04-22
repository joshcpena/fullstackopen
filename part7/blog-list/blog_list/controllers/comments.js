const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.post('/', async (request, response) => {
  const { body } = request;
  const comment = new Comment({
    content: body.content,
    blogId: body.blogId,
  });
  const result = await comment.save();
  return response.json(result);
});

module.exports = commentsRouter;
