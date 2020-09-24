import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Transition from 'components/animations/Transition';
import QuestionCountDown from 'components/counters/QuestionCountDown';

const ByTimeField = ({ currentActionTime, referenceId }) => {
  const [isDialogOpend, setIsDialogOpened] = useState(false);
  const closeDialog = () => {
    setIsDialogOpened(false);
  };
  return (
    <button
      id={'hamada'}
      className={'by-time'}
      onClick={() => {
        console.log('isClicked');
        setIsDialogOpened(true);
      }}>
      <QuestionCountDown
        showIcon={false}
        className={'currentActionTime'}
        data-reference={referenceId}
        date={currentActionTime}
      />
      <Dialog
        open={isDialogOpend}
        TransitionComponent={Transition}
        maxWidth={'lg'}
        id={'extend-time-dialog'}>
        <DialogTitle id='dialog-title'>
          <Grid container justify={'space-between'}>
            <Grid item>
              <Typography variant={'h6'}>Extend Time</Typography>
            </Grid>
            <Grid item>
              <IconButton
                id={'close-dialog'}
                aria-label='edit'
                onClick={() => {
                  closeDialog();
                }}>
                <CloseIcon color={'primary'} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>hello</div>
        </DialogContent>
      </Dialog>
    </button>
  );
};

export default ByTimeField;
