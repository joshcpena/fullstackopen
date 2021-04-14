import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ saveBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleNewBlog = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
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
  saveBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
