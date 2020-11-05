import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, Tooltip } from '@material-ui/core';
import { useStyles } from 'styles/questionRoasterStyles';
import { useTranslation } from 'react-i18next';

const AssignmentType = ({ index, type }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  switch (type) {
    case 'project':
      return (
        <Fragment>
          <Tooltip
          title={<Typography>{t('questionRoaster:project')}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-project`}
            color={'primary'}
            src={require('../../../../assets/project.svg')}
            width={'100%'}
          />
          </Grid>
          </Tooltip>
        </Fragment>
      );
    case 'question':
      return (
        <Fragment>
          <Tooltip
          title={<Typography>{t('questionRoaster:question')}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-question`}
            color={'primary'}
            src={require('../../../../assets/question.svg')}
            width={'100%'}
            />
            </Grid>
          </Tooltip>
        </Fragment>
      );
    case 'call':
      return (
        <Fragment>
         <Tooltip
          title={<Typography>{t('questionRoaster:call')}</Typography>}>
          <Grid className={classes.assignmentTypeIcon}>
          <img
            id={`question-${index}-call`}
            color={'primary'}
            src={require('../../../../assets/call.svg')}
            width={'100%'}
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
