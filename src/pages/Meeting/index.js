import React, { Fragment } from 'react';
import { Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import useMeetingPageStyle from './styles/meetingPage';
import ErrorDialog from '../../components/errors/ErrorDialog';
import useMeetingsFetcher from './hooks/useMeetingFetcher';
import MeetingsTable from './MeetingsTable';

const MeetingsPage = () => {
  const classes = useMeetingPageStyle();
  const { isLoading, fetchedMeetings, errorMessage } = useMeetingsFetcher();

  if (isLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress/>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {!!errorMessage && (
          <ErrorDialog message={errorMessage} close={() => {}} />
        )}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-meeting-button'}
            onClick={() => {}}
            color='primary'>
            Request a call
          </Button>

          <MeetingsTable meetings={fetchedMeetings}/>
        </Grid>
      </div>
    );
  }
};

export default MeetingsPage;
