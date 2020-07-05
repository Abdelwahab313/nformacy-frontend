import React from 'react';
import { Grid, Card } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMeetingPageStyle from './styles/meetingPage';
import ErrorDialog from '../components/errors/ErrorDialog';
import useFetchShowMeetingDetails from './hooks/useFetchMeetingDetails';
import { useLocation } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShortlistedFreelancersSection from './ShortlistedFreelancersSection';

const MeetingDetailsPage = () => {
  const meetingPageclasses = useMeetingPageStyle();
  const classes = useStyles();

  const location = useLocation();
  const meetingId = location.state.meetingId;
  const {
    isLoading,
    fetchedMeetingDetails: meetingDetails,
    errorMessage,
  } = useFetchShowMeetingDetails(meetingId);

  if (isLoading) {
    return (
      <div className={meetingPageclasses.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        {!!errorMessage && (
          <ErrorDialog message={errorMessage} close={() => {}} />
        )}
        <Grid className={meetingPageclasses.root}>
          <h3>Meeting Details</h3>
          <Card id={'meeting-details'}>
            <List className={classes.root}>
              <ListItem>
                <ListItemText
                  primary='Field'
                  secondary={meetingDetails.field}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Sub field'
                  secondary={meetingDetails.subfield}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='industry'
                  secondary={meetingDetails.industry}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Description'
                  secondary={meetingDetails.description}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Status'
                  secondary={meetingDetails.status}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid className={meetingPageclasses.root}>
          <h3>Proposed freelancers</h3>

          {meetingDetails.meetingFreelancers.length > 0 ? (
            <ShortlistedFreelancersSection
              shortlistedFreelancers={meetingDetails.meetingFreelancers.map((meetingFreelancers)=> meetingFreelancers.user)}
            />
          ) : (
            <h6>No available freelancers</h6>
          )}
        </Grid>
      </div>
    );
  }
};

export default MeetingDetailsPage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
