import React, { Fragment } from 'react';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import CallIcon from '@material-ui/icons/Call';
import { useStyles } from 'styles/questionRoasterStyles';
import t from '../../locales/en/questionRoaster';

const AssignmentType = ({ index, type }) => {
  const classes = useStyles();

  switch (type) {
    case 'project':
      return (
        <Fragment>
          <BusinessCenterIcon id={`question-${index}-project`} color={'primary'}
                              className={classes.assignmentTypeIcon}/>
          <Typography>{t['project']}</Typography>
        </Fragment>
      );
    case 'question':
      return (
        <Fragment>
          <img
            src={require('../../assets/image3.png')}
            width={'50px'}
            alt={'questionAssignmentType'}
          />
          <Typography>{t['question']}</Typography>
        </Fragment>
      );
    case 'call':
      return (
        <Fragment>
          <CallIcon id={`question-${index}-call`} color={'primary'} className={classes.assignmentTypeIcon}/>
          <Typography>{t['call']}</Typography>
        </Fragment>
      );
    default:
      return null;
  }
};

export default AssignmentType;