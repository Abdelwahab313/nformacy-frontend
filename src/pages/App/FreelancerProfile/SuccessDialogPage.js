import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useStyles } from 'styles/successStyle';
import SubmitButton from 'components/buttons/SubmitButton';
import Transition from 'components/animations/Transition';
import { DialogActions } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';

const SuccessDialogPage = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth='lg'
      PaperProps={{ id: 'basicInfoDialog' }}
      onClose={handleClose}
      open={open}>
      <DialogContent>
        <Grid
          id='welcomeContainer'
          xs={12}
          direction='column'
          alignItems='center'
          container>
          <Grid item>
            <CustomTypography
              variant={'body1'}
              gutterBottom
              className={classes.successText}>
              Congratulations!! You can now use nformacy Workspace.
            </CustomTypography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Grid item className={classes.buttonContainer}>
          <SubmitButton onClick={handleClose} buttonText='Ok' />
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialogPage;
