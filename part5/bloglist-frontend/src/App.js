import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([-1, ''])
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user);
      setUsername('');
      setPassword('')
    } catch (exception) {
      setMessage(['Wrong username or password', 'error'])
      setTimeout(() => {
        setMessage([-1, ''])
      }, 5000)
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleNewBlog = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  const saveBlog = async (event) => {
    event.preventDefault()
    const blogObj = {
      title: newBlog.title,
      author: newBlog.author || '',
      url: newBlog.url,
    }

    const result = await blogService.saveBlog(blogObj)
    setBlogs(blogs.concat(result))
    setNewBlog({ title: '', author: '', url: '' })
    setMessage([`a new blog ${blogObj.title} by ${blogObj.author} added`, 'notification'])
    setTimeout(() => {
      setMessage([-1, ''])
    }, 5000)


  }

  return (
    <div>
      {      console.log(message[0], message[1])}
      <Notification message={message[0]} className={message[1]} />
      {user === null ?
        <div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <span>{user.username} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <br /> <br />
          <NewBlogForm newBlog={newBlog} saveBlog={saveBlog} handleNewBlog={handleNewBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}

    </div>
  )
}

export default App