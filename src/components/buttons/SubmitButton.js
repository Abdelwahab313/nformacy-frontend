import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { lighterGrey, darkBlue, white } from 'styles/colors';

const buttonStyles = (disabled) => {
  return {
    backgroundColor: disabled ? lighterGrey : darkBlue,
    color: white,
  };
};

/**
 * Submit Button that can handle async onclick callback just needs to provide async in the onclick method
 *
 *
 * @returns {void}
 */
const SubmitButton = ({
  buttonText,
  disabled,
  color = 'primary',
  onClick,
  ...props
}) => {
  const [isLoadingSubmitData, setIsLoadingSubmitData] = useState(false);

  const wrappedOnClick = () => {
    if (isPromise(onClick)) {
      setIsLoadingSubmitData(true);
      onClick().finally(() => setIsLoadingSubmitData(false));
    } else {
      onClick();
    }
  };

  return (
    <Button
      id='submitButton'
      disabled={disabled || isLoadingSubmitData}
      variant='contained'
      style={color === 'primary' ? buttonStyles(disabled) : {}}
      onClick={wrappedOnClick}
      {...props}>
      {isLoadingSubmitData && <CircularProgress size={18} color='secondary' />}
      {!isLoadingSubmitData && buttonText}
    </Button>
  );
};

/**
 * Determine whether the given `promise` is a Promise.
 *
 * @param {*} promise
 *
 * @returns {Boolean}
 */
function isPromise(promise) {
  return (
    (!!promise && typeof promise.then === 'function') ||
    promise?.constructor?.name === 'AsyncFunction'
  );
}

export default SubmitButton;
