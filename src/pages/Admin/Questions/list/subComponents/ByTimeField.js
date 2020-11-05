import React, { Fragment, useState } from 'react';

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
import CustomInput from 'components/inputs/CustomInput';
import SubmitButton from 'components/buttons/SubmitButton';
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';
import {extendTime} from 'apis/questionsAPI'
import authManager from 'services/authManager';

const ByTimeField = ({ currentActionTime, referenceId, questionId }) => {
  const [isDialogOpend, setIsDialogOpened] = useState(false);
  const [extendedTime, setIsExtendedTime] = useState();
  const [isError, setIsError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  
  const closeDialog = () => {
    setIsDialogOpened(false);
  };
  const submitExtendedTime = (questionId, extendedTime) => {
    setIsError(false);
    if(extendedTime > 0) {
      extendTime(questionId, extendedTime).then(
        () => {
          setIsDialogOpened(false);
          setSnackbarMessage('Successfully updated question time');
        }
      ).then(() => {window.location.reload(true)} )
    } else {
      setSnackbarMessage('Please enter a valied time to extend');
      setIsError(true);
    }
  };
  
  return (
    <Fragment>
      <button
        className={'by-time'}
        onClick={() => {
          !authManager.isAdviser() && setIsDialogOpened(true);
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
              onClick={() => submitExtendedTime(questionId, extendedTime)}
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
