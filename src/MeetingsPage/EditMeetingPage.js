import React, { useState } from 'react';
import { Grid, Card } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMeetingPageStyle from './styles/meetingPage';
import ErrorDialog from '../components/errors/ErrorDialog';
import useFetchShowMeetingDetails from './hooks/useFetchMeetingDetails';
import { useLocation } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';

const EditMeetingPage = () => {
  const meetingPageclasses = useMeetingPageStyle();
  const classes = useStyles();
  const [selectedFreelancer, setSelectedFreelancer] = useState();

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
          <Card>
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
          <Card>
            <List className={classes.root}>
              {meetingDetails.shortlistedFreelancers.map((freelancer) => (
                <>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectedFreelancer(freelancer.id);
                    }}>
                    <ListItemText
                      primary={`${freelancer.firstName} ${freelancer.lastName}`}
                    />
                    {selectedFreelancer === freelancer.id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={selectedFreelancer === freelancer.id}
                    timeout='auto'
                    unmountOnExit>
                    <List component='div' disablePadding>
                      <ListItem className={classes.nested}>
                        <ListItemText primary='Pick a date' />
                        <ListItemIcon>
                          <IconButton
                            onClick={() => {}}
                            aria-label='add to calendar'>
                            <EventIcon />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </Collapse>
                </>
              ))}
            </List>
          </Card>
        </Grid>
      </div>
    );
  }
};

export default EditMeetingPage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
