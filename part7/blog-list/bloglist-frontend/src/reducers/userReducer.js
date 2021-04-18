import blogService from '../services/blogs';

const initialUser = 'we got issues';

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case 'INIT_LOCAL_USER': {
      return action.data;
    }
    case 'INIT_USER': {
      return action.data;
    }
    case 'LOGOUT': {
      return action.data;
    }
    default: return state;
  }
};

export const initializeLocalUser = (loggedUserJson) => (dispatch) => {
  const loggedUser = JSON.parse(loggedUserJson);
  dispatch({
    type: 'INIT_LOCAL_USER',
    data: loggedUser,
  });
  blogService.setToken(loggedUser.token);
};

export const initializeUser = (loggedUser) => (dispatch) => {
  blogService.setToken(loggedUser.token);
  dispatch({
    type: 'INIT_USER',
    data: loggedUser,
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
    data: null,
  });
};

export default userReducer;
