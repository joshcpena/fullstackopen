import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import loginService from './services/login';
import Togglable from './components/Togglable';
import { setMessage } from './reducers/notificationReducer';
import {
  initializeBlogs, createBlog, removeBlog, incrementBlogLike,
} from './reducers/blogReducer';
import { initializeLocalUser, initializeUser, logoutUser } from './reducers/userReducer';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState([-1, '']);
  // const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser');
    if (loggedUserJson) {
      dispatch(initializeLocalUser(loggedUserJson));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService({ username, password });
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(loggedUser),
      );
      dispatch(initializeUser(loggedUser));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setMessage('Wrong username or password', 'error', 5));
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    window.localStorage.removeItem('loggedInUser');
  };

  const saveBlog = async (blogObj) => {
    blogFormRef.current.toggleVisability();
    dispatch(createBlog(blogObj));
    dispatch(setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`, 'notification', 5));
  };

  const deleteBlog = async (blog) => {
    // eslint-disable-next-line no-alert
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      dispatch(removeBlog(blog));
    }
  };

  const addLike = async (blog) => {
    dispatch(incrementBlogLike(blog));
    dispatch(setMessage(`you liked ${blog.title} by ${blog.author}`, 'notification', 5));
  };
  const message = useSelector((state) => state.message);
  const className = useSelector((state) => state.className);

  return (
    <div>
      <Notification message={message} className={className} />
      {user === null
        ? (
          <div>
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </div>
        )
        : (
          <div>
            <h2>blogs</h2>
            <span>
              {user.name}
              {' '}
              (
              {user.username}
              )
              {' '}
              logged in
              {' '}
            </span>
            <button type="button" onClick={handleLogout}>logout</button>
            <br />
            {' '}
            <br />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <NewBlogForm saveBlog={saveBlog} />
            </Togglable>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                username={user.username}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        )}

    </div>
  );
};

export default App;
