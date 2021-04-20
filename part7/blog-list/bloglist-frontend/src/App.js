import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import User from './components/User';
// import { setMessage } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeLocalUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogout = () => {
    dispatch(logoutUser());
    window.localStorage.removeItem('loggedInUser');
  };

  const message = useSelector((state) => state.message);
  const className = useSelector((state) => state.className);

  return (
    <Router>
      <Notification message={message} className={className} />
      {user === null
        ? (
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )
        : (
          <div>
            <h2>blogs</h2>
            <span>
              {`${user.name} ${user.username} logged in`}
            </span>
            <button type="button" onClick={handleLogout}>logout</button>
            <Switch>
              <Route path="/users">
                <User />
              </Route>
              <Route path="/">
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <NewBlogForm blogFormRef={blogFormRef} />
                </Togglable>
                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    username={user.username}
                  />
                ))}
              </Route>
            </Switch>
          </div>
        )}
    </Router>

  );
};

export default App;
