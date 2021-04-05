const initialNotification = '';

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.data;
    }
    default: return state;
  }
};

export const setMessage = (message) => (
  {
    type: 'SET_MESSAGE',
    data: message,
  }
);

export default notificationReducer;
