import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

const SuccessSnackBar = ({ isSnackbarShown, closeSnackBar, content, isError=false }) => {
  const severity = isError ? 'error' : 'success';
  return (<Snackbar
      open={isSnackbarShown}
      autoHideDuration={2000}
      onClose={() => {
        closeSnackBar();
      }}>
      <Alert onClose={() => closeSnackBar()} severity={severity}>
        <Typography>{content}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
