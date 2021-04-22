// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { setMessage } from '../reducers/notificationReducer';
import {
  removeBlog, incrementBlogLike,
} from '../reducers/blogReducer';

const Blog = ({
  blog, username,
}) => {
  const dispatch = useDispatch();
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

  const { id } = useParams();
  if (id) {
    if (typeof (blog) === 'undefined') {
      dispatch(setMessage(`blog with id ${id} not found, redirecting...`, 'error', 5));
      return (<Redirect to="/" />);
    }
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        {' '}
        <br />
        {`${blog.likes} likes`}
        <button id="like-button" type="button" onClick={() => addLike(blog)}>like</button>
        {' '}
        <br />
        {`added by ${blog.user.username}`}
        {' '}
        <br />
        {username === blog.user.username
          && <button id="remove-button" type="button" onClick={() => deleteBlog(blog)}>remove</button>}
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
