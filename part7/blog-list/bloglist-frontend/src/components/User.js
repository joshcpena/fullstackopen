import React from 'react';
import { useSelector } from 'react-redux';

// import PropTypes from 'prop-types';

const User = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs.filter(
    (blog) => blog.user.username === user.username,
  ));
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
    </div>
  );
};

export default User;
