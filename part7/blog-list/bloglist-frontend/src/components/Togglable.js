import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false);

  const hideWhenVisable = { display: visable ? 'none' : '' };
  const showWhenVisable = { display: visable ? '' : 'none' };

  const toggleVisability = () => setVisable(!visable);

  useImperativeHandle(ref, () => ({ toggleVisability }));

  return (
    <div>
      <div style={hideWhenVisable}>
        <Button type="button" variant="outline-secondary" onClick={toggleVisability}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisable} className="togglableContent">
        {props.children}
        <Button type="button" variant="outline-primary" onClick={toggleVisability}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
