import React, { useRef, useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorDialog from '../components/errors/ErrorDialog';
import useMeetingPageStyle from './styles/meetingPage';

import useMeetingsFetcher from './useMeetingFetcher';
import MeetingsTable from './MeetingsTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const MeetingsPage = () => {
  const classes = useMeetingPageStyle();
  const { isLoading, fetchedMeetings, errorMessage } = useMeetingsFetcher();

  let selectedMeeting = useRef(undefined);

  if (isLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {/* {!!errorMessage && (
          <ErrorDialog
            message={errorMessage}
            close={() => {}}
          />
        )} */}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-meeting-button'}
            onClick={() => {}}
            color='primary'>
            Request a call
          </Button>

          <MeetingsTable meetings={fetchedMeetings} />
        </Grid>

        <Dialog
          fullScreen
          open={false}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                onClick={
                  () => {}
                  // dispatch({ type: SET_UPDATE_DIALOG_OPEN, payload: false })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>edit meeting</Typography>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
};

export default MeetingsPage;
