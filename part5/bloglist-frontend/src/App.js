import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([-1, ''])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1))

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
      blogService.setToken(user.token)
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

  const saveBlog = async (blogObj) => {
    const result = await blogService.saveBlog(blogObj)
    setBlogs(blogs.concat(result).sort((a, b) => (a.likes > b.likes) ? -1 : 1))
    setMessage([`a new blog ${blogObj.title} by ${blogObj.author} added`, 'notification'])
    setTimeout(() => {
      setMessage([-1, ''])
    }, 5000)
  }

  const deleteBlog = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService.deleteBlog(blog.id)
      const newList = blogs.filter(element => element.id !== blog.id)
      setBlogs(newList)
    }
  }

  const addLike = async (blog) => {
    const result = await blogService.addLike(blog)

    const newBlogs = blogs.map(element => (
      result.id === element.id
        ? result
        : element
    ))
    setBlogs(newBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1))
  }

  return (
    <div>
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
          <Togglable buttonLabel={'new blog'}>
            <NewBlogForm saveBlog={saveBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              username={user.username}
              deleteBlog={deleteBlog}
            />
          )}
        </div>}

    </div>
  )
}

export default App