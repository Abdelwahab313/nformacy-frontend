import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Card,
  Dialog,
  Slide,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
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
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  calendarDialog: {
    width: 360,
    maxWidth: 360,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function ShortlistedFreelancersSection({ shortlistedFreelancers }) {
  const classes = useStyles();
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const [isCalendarOpened, setIsCalendarOpened] = useState();

  return (
    <Card id={'shortlisted-candidates-section'}>
      <List className={classes.root}>
        {shortlistedFreelancers.map((freelancer) => (
          <>
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
          </>
        ))}
      </List>

      <Dialog
        open={isCalendarOpened}
        TransitionComponent={Transition}
        id={'add-user-dialog'}>
        <DialogTitle id='alert-dialog-title'>
          {'Please pick available date to schedule the call'}
        </DialogTitle>

        <DialogContent className={classes.calendarDialog}></DialogContent>
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
