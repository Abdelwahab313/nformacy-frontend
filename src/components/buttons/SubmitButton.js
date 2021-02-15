import React from 'react';
import { Button } from '@material-ui/core';
import { lighterGrey, darkBlue, white } from 'styles/colors';


const buttonStyles = (disabled) => {
  return {
    backgroundColor: disabled ? lighterGrey : darkBlue,
    color: white,
  };
};

const SubmitButton = ({
  buttonText,
  disabled,
  color = 'primary',
  ...props
}) => {
  return (
    <Button
      id='submitButton'
      disabled={disabled}
      variant='contained'
      style={color === 'primary' ? buttonStyles(disabled) : {}}
      {...props}>
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
