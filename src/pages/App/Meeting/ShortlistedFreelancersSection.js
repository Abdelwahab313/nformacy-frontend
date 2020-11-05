import React, { useState, Fragment } from 'react';
import { Card } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import MeetingTimeSelectorCalendarDialog
  from '../../../components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router';
import { scheduleMeeting } from '../../../apis/meetingsAPI';
import Typography from '@material-ui/core/Typography';
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

function ShortlistedFreelancersSection({ shortlistedFreelancers }) {
  const classes = useStyles();
  const location = useLocation();
  const meetingId = location.state.meetingId;

  const [selectedFreelancer, setSelectedFreelancer] = useState({});
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const closeCalendar = () => {
    setIsCalendarOpened(false);
  };
  const handleDateSelected = (selectedDay) => {
    scheduleMeeting(meetingId, selectedFreelancer.id, selectedDay).then(
      (response) => {
        setIsSnackbarShown(true);
      },
    );
    closeCalendar();
  };
  return (
    <Card id={'shortlisted-candidates-section'}>
      <List className={classes.root}>
        {shortlistedFreelancers.map((freelancer) => (
          <Fragment key={freelancer.id}>
            <ListItem
              id={`freelancer-${freelancer.id}`}
              className={'freelancer-row'}
              button
              onClick={() => {
                setSelectedFreelancer(freelancer);
              }}>
              <ListItemText
                primary={`${freelancer.firstName} ${freelancer.lastName}`}
              />
              {selectedFreelancer.id === freelancer.id ? (
                <ExpandLess/>
              ) : (
                <ExpandMore/>
              )}
            </ListItem>
            <Collapse
              in={selectedFreelancer.id === freelancer.id}
              timeout='auto'
              unmountOnExit>
              <List component='div' disablePadding>
                <ListItem className={classes.nested}>
                  <ListItemText
                    primary={<Typography variant={'body2'}>Pick Time of the Call</Typography>}
                  />
                  <ListItemIcon>
                    <IconButton
                      id={`freelancer-${freelancer.id}-calendar`}
                      onClick={() => {
                        setIsCalendarOpened(true);
                      }}
                      aria-label='add to calendar'>
                      <EventIcon/>
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Collapse>
          </Fragment>
        ))}
      </List>
      <SuccessSnackBar
        closeSnackBar={() => {
          setIsSnackbarShown(false);
          window.location.reload();
        }}
        isSnackbarShown={isSnackbarShown}
        content={`Meeting has been scheduled successfully with ${selectedFreelancer.firstName} ${selectedFreelancer.lastName}`}
      />

      <MeetingTimeSelectorCalendarDialog
        open={isCalendarOpened}
        onClose={closeCalendar}
        availableDates={
          !!selectedFreelancer.freeDates ? selectedFreelancer.freeDates : []
        }
        onSelectDate={handleDateSelected}
      />
    </Card>
  );
}

export default ShortlistedFreelancersSection;
