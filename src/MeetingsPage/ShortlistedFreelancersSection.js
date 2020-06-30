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
import CalendarDialog from './Calendar/CalendarDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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

      <CalendarDialog
        open={isCalendarOpened}
        onClose={() => setIsCalendarOpened(false)}
      />
    </Card>
  );
}

export default ShortlistedFreelancersSection;
