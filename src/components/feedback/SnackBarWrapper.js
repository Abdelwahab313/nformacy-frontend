import React, { Fragment } from 'react';
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';
import { useSnackBar } from 'context/SnackBarContext';

const SnackBarWrapper = ({ children }) => {
  const { message, isError, resetMessage } = useSnackBar();
  return (
    <Fragment>
      {children}
      <SuccessSnackBar
        isError={isError}
        isSnackbarShown={!!message}
        closeSnackBar={() => resetMessage()}
        content={message}
      />
    </Fragment>
  );
};

export default SnackBarWrapper;
