const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    returnedObj.id = returnedObj._id.toString();
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete returnedObj._id;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
