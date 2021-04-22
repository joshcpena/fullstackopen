/* eslint-disable no-param-reassign, no-underscore-dangle */
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
});

commentSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
