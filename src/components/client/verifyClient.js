import { makeStyles } from '@material-ui/core';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Link } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { API_BASE_URL } from '../../settings';

const VerifyClient = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleVerification = () => {
    axios
      .patch(`${API_BASE_URL}/clients/${props.id}/verify_client`)
      .then((res) => {});
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
      <Link className={classes.unVerifiedLink} onClick={handleClickOpen}>
        {' '}
        وثق العميل
      </Link>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          سيتم توثيق العميل:{' '}
          <span className={classes.unVerifiedLink}>{props.clientName}</span>
        </DialogTitle>
        <DialogActions className={classes.dialogAction}>
          <Button onClick={handleVerification} color='primary'>
            هل انت متأكد من ثوثيق هـذا العميل
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyClient;
