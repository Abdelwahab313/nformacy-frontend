import React from 'react';

const ErrorMessage = ({ errorField }) => {
  if (!!errorField) {
    return (
      <span
        style={{
          color: 'red',
          margin: '8px',
        }}>
        {errorField.message}
      </span>
    );
  } else {
    return null;
  }
};

export default ErrorMessage;
