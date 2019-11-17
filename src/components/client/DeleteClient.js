import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { deleteClient } from '../../apis/clientsApi';
import { useAuth } from '../../context/auth';

const DeleteClient = ({
  uuid,
  clientName,
  onDeleteDone,
  onDeleteFail,
  identifier,
}) => {
  const [open, setOpen] = React.useState(true);
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => {
    if (identifier) {
      setOpen(true);
    }
  }, [identifier]);
  const handleClose = () => {
    setOpen(false);
    onDeleteFail();
  };
  const handleDeletion = () => {
    deleteClient(uuid, authTokens)
      .then((res) => {
        onDeleteDone(uuid);
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
    deleteLink: {
      color: '#2C87F0',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  }));
  const classes = useStyles();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}>
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        سيتم حذف العميل:{' '}
        <span className={classes.deleteLink}>{clientName}</span>
      </DialogTitle>
      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={handleDeletion}
          style={{ backgroundColor: 'red', color: 'white' }}>
          هل انت متأكد من حذف هـذا العميل
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteClient;
