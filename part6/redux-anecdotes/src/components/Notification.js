import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  // const message = useSelector((state) => state.notification);
  const { message } = props;
  if (message.length > 0) {
    return (
      <div style={style}>
        {message}
      </div>
    );
  }
  return <div />;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({ message: state.notification });

export default connect(mapStateToProps)(Notification);
