import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setMessage } from '../reducers/notificationReducer';

const NewBlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const dispatch = useDispatch();

  const handleNewBlog = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  const saveBlog = async (blogObj) => {
    blogFormRef.current.toggleVisability();
    dispatch(createBlog(blogObj));
    dispatch(setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`, 'notification', 5));
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObj = {
      title: newBlog.title,
      author: newBlog.author || '',
      url: newBlog.url,
    };

    setNewBlog({ title: '', author: '', url: '' });
    saveBlog(blogObj);
  };

  return (
    <div className="formDiv">
      <h2>create new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleNewBlog}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  blogFormRef: PropTypes.func.isRequired,
};

export default NewBlogForm;
