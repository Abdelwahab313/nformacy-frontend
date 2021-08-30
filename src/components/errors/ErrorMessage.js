import React from 'react';

const ErrorMessage = ({ errorField, className }) => {
  if (!!errorField) {
    return (
      <span style={{ color: 'red' }} className={className}>
        {errorField.message}
      </span>
    );
  } else {
    return null;
  }
};

export default ErrorMessage;
