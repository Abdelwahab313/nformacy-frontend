import React, { Fragment, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Transition from 'components/animations/Transition';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import CustomInput from 'components/CustomInput/CustomInput';
import SubmitButton from 'components/buttons/SubmitButton';
import SuccessSnackBar from 'components/Snackbar/SuccessSnackBar';

const ByTimeField = ({ currentActionTime, referenceId }) => {
  const [isDialogOpend, setIsDialogOpened] = useState(false);
  const [extendedTime, setIsExtendedTime] = useState();
  const [isError, setIsError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const closeDialog = () => {
    setIsDialogOpened(false);
  };
  const submitExtendedTime = () => {
    console.log('=====submiting time=====', extendedTime);
    // submiting time to backend
    setSnackbarMessage('Successfully updated question time');
    setIsDialogOpened(false);
  };
  return (
    <Fragment>
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
      </button>
      <Dialog
        open={isDialogOpend}
        TransitionComponent={Transition}
        maxWidth={'sm'}
        fullWidth={true}
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
          <Grid>
            <CustomInput
              labelText='Extended Time (In Hours)'
              id='extendTimeInput'
              formControlProps={{
                style: {
                  margin: 0,
                },
                fullWidth: true,
              }}
              inputProps={{
                value: extendedTime,
                name: 'extendedTime',
                type: 'number',
                onChange: (e) => {
                  console.log('the value=========', e.target.value);
                  setIsExtendedTime(e.target.value);
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              justifyContent: 'flex-end',
              float: 'right',
              margin: '0.5rem 0',
            }}
            // className={questionRoasterClasses.answerButtonsContainer}
          >
            <SubmitButton
              id='cancel'
              onClick={() => closeDialog()}
              buttonText={'Cancel'}
              style={{
                marginRight: '10px',
              }}
            />
            <SubmitButton
              id={'submitExtendedTime'}
              onClick={() => submitExtendedTime()}
              buttonText={'Submit'}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <SuccessSnackBar
        isError={isError}
        isSnackbarShown={ !!snackbarMessage }
        closeSnackBar={() => setSnackbarMessage('')}
        content={snackbarMessage}
      />
    </Fragment>
  );
};

export default ByTimeField;
