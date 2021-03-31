import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false);

  const hideWhenVisable = { display: visable ? 'none' : '' };
  const showWhenVisable = { display: visable ? '' : 'none' };

  const toggleVisability = () => setVisable(!visable);

  useImperativeHandle(ref, () => ({ toggleVisability }));

  return (
    <div>
      <div style={hideWhenVisable}>
        <button type="button" onClick={toggleVisability}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <button type="button" onClick={toggleVisability}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
