import React from 'react';
import { nextButtonStyles } from '../../styles/formsStyles';
import { Button } from '@material-ui/core';


const SubmitButton = ({ buttonText, disabled, ...props }) => {
  return (
    <Button
      id='submitButton'
      disabled={disabled}
      variant='contained'
      style={nextButtonStyles(disabled)}
      {...props}
    >
      {buttonText}
    </Button>
  );
};


export default SubmitButton;