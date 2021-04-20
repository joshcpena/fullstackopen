import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setMessage } from '../reducers/notificationReducer';
import { initializeUser } from '../reducers/userReducer';

const LoginForm = ({
  username, setUsername, password, setPassword,
}) => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <h2>log in to application </h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
