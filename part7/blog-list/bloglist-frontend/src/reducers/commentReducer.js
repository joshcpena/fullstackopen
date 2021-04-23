import commentService from '../services/comments';

const initialComments = [];

const commentReducer = (state = initialComments, action) => {
  switch (action.type) {
    case 'GET_COMMENTS': {
      return action.data;
    }
    case 'ADD_COMMENT': {
      return state.concat(action.data);
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

export const addComment = (content, blogId) => async (dispatch) => {
  const commentObj = { content, blogId };
  console.log('text', content, 'blogid', blogId);
  const result = await commentService.addComment(commentObj);
  dispatch({
    type: 'ADD_COMMENT',
    data: result,
  });
};

export default commentReducer;
