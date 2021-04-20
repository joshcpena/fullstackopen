import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import {
  removeBlog, incrementBlogLike,
} from '../reducers/blogReducer';

const Blog = ({
  blog, username,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const deleteBlog = async (blogObj) => {
    // eslint-disable-next-line no-alert
    const result = window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`);
    if (result) {
      dispatch(removeBlog(blogObj));
    }
  };

  const addLike = async (blogObj) => {
    dispatch(incrementBlogLike(blog));
    dispatch(setMessage(`you liked ${blogObj.title} by ${blogObj.author}`, 'notification', 5));
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
  username: PropTypes.string.isRequired,
};

export default Blog;
