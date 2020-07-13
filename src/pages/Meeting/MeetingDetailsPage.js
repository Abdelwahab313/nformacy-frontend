import React, { Fragment } from 'react';
import { Grid, Card } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMeetingPageStyle from './styles/meetingPage';
import ErrorDialog from '../../components/errors/ErrorDialog';
import useFetchShowMeetingDetails from './hooks/useFetchMeetingDetails';
import { useLocation } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShortlistedFreelancersSection from './ShortlistedFreelancersSection';
import MeetingScheduledSection from './MeetingScheduledSection';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/meetingPage';
import Box from '@material-ui/core/Box';

const MEETING_STATUS = {
  pending: 'Pending',
  approved: 'Approved',
  candidatesShortlisted: 'Candidates Shortlisted',
  meetingScheduled: 'Meeting Scheduled',
};

const MeetingDetailsPage = () => {
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
        return <Typography variant='h6'>No Available Freelancers</Typography>;
      case meetingDetails.status === MEETING_STATUS.meetingScheduled:
        const selectedFreelancer = meetingDetails.meetingFreelancers.filter(
          (meetingFreelancer) => meetingFreelancer.selected,
        )[0];
        return (
          <MeetingScheduledSection selectedFreelancer={selectedFreelancer}/>
        );
      case meetingDetails.status === MEETING_STATUS.candidatesShortlisted &&
      meetingDetails.meetingFreelancers.length > 0:
        return (
          <Fragment>
            <Typography variant='h6'>Proposed Freelancers</Typography>
            <ShortlistedFreelancersSection
              setFetchedMeetingDetails={setFetchedMeetingDetails}
              shortlistedFreelancers={meetingDetails.meetingFreelancers.map(
                (meetingFreelancers) => meetingFreelancers.user,
              )}
            />
          </Fragment>
        );
      default:
        return <Typography variant='h6'>No Available Freelancers</Typography>;
    }
  };
  if (isLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <Grid container className={classes.meetingPageContainer}>
      {!!errorMessage && (
        <ErrorDialog message={errorMessage} close={() => {
        }}/>
      )}
      <Grid className={classes.meetingPageSection}>
        <Typography variant='h6'>Meeting Details</Typography>
        <Card id={'meeting-details'}>
          <List className={classes.meetingPageSection}>
            <ListItem>
              <ListItemText primary={<Typography>Purpose of The Call</Typography>} secondary={'consult Expert'}/>
            </ListItem>
            <ListItem>
              <ListItemText primary='Field' secondary={meetingDetails.field}/>
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Sub Field'
                secondary={meetingDetails.subfield}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Industry'
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
      <Box className={classes.meetingPageLowerSection}>
        {renderLowerSection(meetingDetails)}
      </Box>
    </Grid>
  );
};

export default MeetingDetailsPage;