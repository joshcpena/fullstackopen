import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
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

  const blogId = useRouteMatch('/blogs/:id');
  const blogById = blogId ? blogs
    .find((e) => e.id === blogId.params.id) : blogs[0];

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

  if (blogs && blogs.length === 0) return null;
  return (
    <div>
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
            <p>{`${user.name} ${user.username} logged in`}</p>
            <Button type="Button" onClick={handleLogout}>logout</Button>
            <Switch>
              <Route path="/users/:id">
                <Users />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs/:id">
                <Blog blog={blogById} username={user.username} />
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
    </div>
  );
};

export default App;
