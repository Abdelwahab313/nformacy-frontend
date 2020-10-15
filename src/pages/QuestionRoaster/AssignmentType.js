import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/questionRoaster';
import { Tooltip } from '@material-ui/core';

const AssignmentType = ({ index, type }) => {

  switch (type) {
    case 'project':
      return (
        <Fragment>
          <Tooltip 
          title={<Typography>{t['project']}</Typography>}>
          <img
            id={`question-${index}-project`} 
            color={'primary'} 
            src={require('../../assets/project.svg')}
            width={'16px'}
          />
          </Tooltip>
        </Fragment>
      );
    case 'question':
      return (
        <Fragment>
          <Tooltip 
          title={<Typography>{t['question']}</Typography>}>
          <img
            id={`question-${index}-question`} 
            color={'primary'} 
            src={require('../../assets/question.svg')}
            width={'16px'}
          />
          </Tooltip>
        </Fragment>
      );
    case 'call':
      return (
        <Fragment>
         <Tooltip 
          title={<Typography>{t['call']}</Typography>}>
          <img
            id={`question-${index}-call`} 
            color={'primary'} 
            src={require('../../assets/call.svg')}
            width={'16px'}
          />
          </Tooltip>
        </Fragment>
      );
    default:
      return null;
  }
};

export default AssignmentType;
