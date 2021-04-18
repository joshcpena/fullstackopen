import blogService from '../services/blogs';

const initialBlogs = [];

const blogReducer = (state = initialBlogs, action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data;
    }
    case 'CREATE_BLOG': {
      return state
        .concat(action.data)
        .sort((a, b) => ((a.likes > b.likes) ? -1 : 1));
    }
    case 'REMOVE_BLOG': {
      const newList = state.filter((element) => element.id !== action.data.id);

      return newList;
    }
    default: return state;
  }
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  blogs.sort((a, b) => ((a.likes > b.likes) ? -1 : 1));

  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const createBlog = (newBlog) => async (dispatch) => {
  const result = await blogService.saveBlog(newBlog);

  dispatch({
    type: 'CREATE_BLOG',
    data: result,
  });
};

export const removeBlog = (blog) => async (dispatch) => {
  await blogService.deleteBlog(blog.id);
  dispatch({
    type: 'REMOVE_BLOG',
    data: blog,
  });
};

export default blogReducer;
