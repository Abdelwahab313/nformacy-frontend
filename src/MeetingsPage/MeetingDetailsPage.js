import React, { Fragment } from 'react';
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
import MeetingScheduledSection from './MeetingScheduledSection';

const MEETING_STATUS = {
  pending: 'Pending',
  approved: 'Approved',
  candidatesShortlisted: 'Candidates Shortlisted',
  meetingScheduled: 'Meeting Scheduled',
};

const MeetingDetailsPage = () => {
  const meetingPageClasses = useMeetingPageStyle();
  const classes = useStyles();

  const location = useLocation();
  const meetingId = location.state.meetingId;
  const {
    isLoading,
    fetchedMeetingDetails: meetingDetails,
    errorMessage,
    setFetchedMeetingDetails,
  } = useFetchShowMeetingDetails(meetingId);

  const renderLowerSection = (meetingDetails) => {
    switch (true) {
      case meetingDetails.status === MEETING_STATUS.pending:
        return <h3>No available freelancers</h3>;
      case meetingDetails.status === MEETING_STATUS.meetingScheduled:
        const selectedFreelancer = meetingDetails.meetingFreelancers.filter(
          (meetingFreelancer) => meetingFreelancer.selected,
        )[0];
        return (
          <MeetingScheduledSection selectedFreelancer={selectedFreelancer} />
        );
      case meetingDetails.status === MEETING_STATUS.candidatesShortlisted &&
        meetingDetails.meetingFreelancers.length > 0:
        return (
          <Fragment>
            <h3>Proposed freelancers</h3>
            <ShortlistedFreelancersSection
              setFetchedMeetingDetails={setFetchedMeetingDetails}
              shortlistedFreelancers={meetingDetails.meetingFreelancers.map(
                (meetingFreelancers) => meetingFreelancers.user,
              )}
            />
          </Fragment>
        );
      default:
        return <h3>No available freelancers</h3>;
    }
  };
  if (isLoading) {
    return (
      <div className={meetingPageClasses.progressContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {!!errorMessage && (
        <ErrorDialog message={errorMessage} close={() => {}} />
      )}
      <Grid className={meetingPageClasses.root}>
        <h3>Meeting Details</h3>
        <Card id={'meeting-details'}>
          <List className={classes.root}>
            <ListItem>
              <ListItemText primary='Field' secondary={meetingDetails.field} />
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
      <Grid className={meetingPageClasses.root}>
        {renderLowerSection(meetingDetails)}
      </Grid>
    </div>
  );
};

export default MeetingDetailsPage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
