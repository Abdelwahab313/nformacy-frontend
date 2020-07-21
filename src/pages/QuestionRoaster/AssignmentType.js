import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import CallIcon from '@material-ui/icons/Call';
import { useStyles } from '../../styles/questionRoasterStyles';

const AssignmentType = ({ type }) => {
  const classes = useStyles();

  switch (type) {
    case 'Project':
      return (
        <Fragment>
          <BusinessCenterIcon color={'primary'} className={classes.assignmentTypeIcon}  />
          <Typography>Project</Typography>
        </Fragment>
      );
    case 'Question':
      return (
        <Fragment>
          <HelpIcon color={'primary'} className={classes.assignmentTypeIcon}  />
          <Typography>Question</Typography>
        </Fragment>
      );
    case 'Call':
      return (
        <Fragment>
          <CallIcon color={'primary'} className={classes.assignmentTypeIcon} />
          <Typography>Call</Typography>
        </Fragment>
      );
    default:
      return null;
  }
};

export default AssignmentType;
