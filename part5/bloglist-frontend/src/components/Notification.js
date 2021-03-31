import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, className }) => {
  if (message === -1) {
    return null;
  }

  return (
    <div className={className}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string.isRequired,
};

export default Notification;
