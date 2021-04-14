import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({
  blog, addLike, deleteBlog, username,
}) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title}
        {' '}
        {blog.author}
        <button id="view-button" type="button" onClick={() => setVisible(!visible)}>view</button>
        {' '}
        <br />
      </div>
    );
  }
  if (visible) {
    return (
      <div id="visible-blog" style={blogStyle}>
        {blog.title}
        {' '}
        {blog.author}
        <button type="button" onClick={() => setVisible(!visible)}>hide</button>
        {' '}
        <br />
        {blog.url}
        {' '}
        <br />
        likes
        {' '}
        {blog.likes}
        <button id="like-button" type="button" onClick={() => addLike(blog)}>like</button>
        <br />
        {blog.user.username}
        <br />
        {username === blog.user.username
          && <button id="remove-button" type="button" onClick={() => deleteBlog(blog)}>remove</button>}
      </div>
    );
  }
  return null;
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
