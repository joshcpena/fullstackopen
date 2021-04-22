import commentService from '../services/comments';

const initialComments = [];

const commentReducer = (state = initialComments, action) => {
  switch (action.type) {
    case 'GET_COMMENTS': {
      return action.data;
    }
    default: return state;
  }
};

export const getComments = () => async (dispatch) => {
  const comments = await commentService.getAll();
  dispatch({
    type: 'GET_COMMENTS',
    data: comments,
  });
};

export default commentReducer;
