import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  //  const dispatch = useDispatch();

  const handleChange = (event) => {
    props.setFilter(event.target.value);
  };

  const style = { marginBottom: 10 };

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} />
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default connect(null, { setFilter })(Filter);
