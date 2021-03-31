import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>view</button> <br />
      </div>
    )
  }
  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes}<button onClick={() => addLike(blog)}>like</button><br />
        {blog.user.username}<br />
      </div>
    )
  }
}
export default Blog