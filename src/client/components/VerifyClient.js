import { makeStyles } from '@material-ui/core';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { verifyClient } from '../clientsApi';
import { useAuth } from '../../auth/auth';
import { useClientState } from '../context';

const VerifyClient = ({ clientName, uuid, onStateChange }) => {
  const [open, setOpen] = React.useState(false);
  const { authTokens, setAuthTokens } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleVerification = () => {
    verifyClient(uuid, authTokens)
      .then(() => {
        onStateChange();
      })
      .catch((reason) => {
        if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      });
    setOpen(false);
  };
  const useStyles = makeStyles(() => ({
    dialogAction: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    unVerifiedLink: {
      color: '#2C87F0',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.unVerifiedLink}
        style={{ backgroundColor: 'transparent' }}
        onClick={handleClickOpen}>
        {' '}
        وثق العميل
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          سيتم توثيق العميل:{' '}
          <span className={classes.unVerifiedLink}>{clientName}</span>
        </DialogTitle>
        <DialogActions className={classes.dialogAction}>
          <Button
            onClick={handleVerification}
            style={{ backgroundColor: '#1975D2', color: 'white' }}>
            هل انت متأكد من ثوثيق هـذا العميل
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyClient;
