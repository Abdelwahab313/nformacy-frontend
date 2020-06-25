import React, { useState, Fragment } from 'react';
import {
  Card,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Grid,
} from '@material-ui/core';

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
import Calendar from './Calendar/Calendar';
import { CalendarProvider } from './Calendar/Context/CalendarContext';

const dates = [
  {
    type: 'date',
    date: '2020-06-27',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
        excluded_memberships: [],
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-28',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
        excluded_memberships: [],
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-29',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
        excluded_memberships: [],
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-30',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
        excluded_memberships: [],
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function ShortlistedFreelancersSection({ shortlistedFreelancers }) {
  const classes = useStyles();
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);

  return (
    <Card id={'shortlisted-candidates-section'}>
      <List className={classes.root}>
        {shortlistedFreelancers.map((freelancer) => (
          <Fragment>
            <ListItem
              id={`freelancer-${freelancer.id}`}
              className={'freelancer-row'}
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
                      id={`freelancer-${freelancer.id}-calendar`}
                      onClick={() => {
                        setIsCalendarOpened(true);
                      }}
                      aria-label='add to calendar'>
                      <EventIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Collapse>
          </Fragment>
        ))}
      </List>

      <Dialog
        open={isCalendarOpened}
        TransitionComponent={Transition}
        maxWidth={'lg'}
        id={'add-user-dialog'}>
        <DialogTitle id='alert-dialog-title'>
          {'Please pick available date to schedule the call'}
        </DialogTitle>

        <DialogContent>
          <Grid>
            <CalendarProvider initialValue={{ availableDates: dates }}>
              <Calendar />
            </CalendarProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCalendarOpened(false)} color='primary'>
            Disagree
          </Button>
          <Button
            onClick={() => setIsCalendarOpened(false)}
            color='primary'
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ShortlistedFreelancersSection;
