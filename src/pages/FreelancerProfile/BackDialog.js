import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import t from '../../locales/en/freelancerProfile.json';

const BackDialog = ({ open, onAgree, onCancel }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div id='backDialog'>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="back-dialog-title">{t.areYouSureYouWantToBack}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t.ifYouGoBackYourDataWillBeLost}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel} id='cancelBack' color="primary">
            {t.cancel}
          </Button>
          <Button onClick={onAgree} color="primary" id='confirmBack' autoFocus>
            {t.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default BackDialog;