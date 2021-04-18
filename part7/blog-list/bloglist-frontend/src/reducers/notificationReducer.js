const initialNotification = '';

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.data;
    }
    default: return state;
  }
};

const clearMessage = () => ({
  type: 'SET_MESSAGE',
  data: '',
});

let timeoutId;

export const setMessage = (message, className, seconds) => async (dispatch) => {
  dispatch({
    type: 'SET_MESSAGE',
    data: { message, className },
  });
  clearTimeout(timeoutId);
  timeoutId = await setTimeout(() => dispatch(clearMessage()), seconds * 1000);
};

export default notificationReducer;
