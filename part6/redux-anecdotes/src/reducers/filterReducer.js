const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.data;
    }
    default: return state;
  }
};

export const setFilter = (filterText) => ({
  type: 'SET_FILTER',
  data: filterText,
});

export default filterReducer;
