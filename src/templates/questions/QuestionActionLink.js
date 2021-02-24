import React from 'react';
import {
  questionStatusActions,
  QUESTION_STATUS,
} from 'constants/questionStatus';
import authManager from 'services/authManager';
import LinkText from 'components/typography/LinkText';
import { RoutesPaths } from 'constants/routesPath';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const QuestionActionLink = ({ state, id, referenceNumber, answersCount }) => {
  let actionNeededLabel =
    questionStatusActions[state].action[
      authManager.isAdviser() ? 'adviser' : 'admin'
    ];

  if (!actionNeededLabel) {
    return '';
  }

  if (state === QUESTION_STATUS.freelancerAnswers && answersCount === 0) {
    actionNeededLabel = 'Waiting For Answers';
  }
  return (
    <LinkText
      to={{
        pathname: RoutesPaths.Admin.QuestionsDetails,
        state: {
          questionId: id,
        },
      }}>
      <StyledStatusChip
        data-status={state}
        className={'state'}
        data-reference={referenceNumber}
        label={actionNeededLabel}
      />
    </LinkText>
  );
};

const StyledStatusChip = withStyles({
  root: {
    margin: 1,
    backgroundColor: '#cec8ef',
  },
  label: {
    fontSize: '0.8rem',
  },
})(Chip);

export default QuestionActionLink;
