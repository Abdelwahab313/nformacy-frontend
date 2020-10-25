import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import t from 'locales/en/questionRoaster';
import { Grid, Tooltip } from '@material-ui/core';
import { useStyles } from 'styles/questionRoasterStyles';

const AssignmentType = ({ index, type }) => {

  const classes = useStyles();

  switch (type) {
    case 'project':
      return (
        <Fragment>
          <Tooltip 
          title={<Typography>{t['project']}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-project`} 
            color={'primary'} 
            src={require('../../../assets/project.svg')}
            width={'100%'}
            height={'100%'}
          />
          </Grid>
          </Tooltip>
        </Fragment>
      );
    case 'question':
      return (
        <Fragment>
          <Tooltip 
          title={<Typography>{t['question']}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-question`} 
            color={'primary'} 
            src={require('../../../assets/question.svg')}
            width={'100%'}
            height={'100%'}
            />
            </Grid>
          </Tooltip>
        </Fragment>
      );
    case 'call':
      return (
        <Fragment>
         <Tooltip 
          title={<Typography>{t['call']}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-call`} 
            color={'primary'} 
            src={require('../../../assets/call.svg')}
            width={'100%'}
            height={'100%'}         
            />
            </Grid>
          </Tooltip>
        </Fragment>
      );
    default:
      return null;
  }
};

export default AssignmentType;
