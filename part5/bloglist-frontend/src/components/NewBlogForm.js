import React from 'react';

const NewBlogForm = ({ newBlog, handleNewBlog, setNewBlog }) => (
  <div>
    <h2>create new blog entry</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        title
      <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleNewBlog}
        />
      </div>
      <div>
        author
      <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleNewBlog}
        />
      </div>
      <div>
        url
      <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleNewBlog}
        />
      </div>
    </form>
  </div>
)

export default NewBlogForm
