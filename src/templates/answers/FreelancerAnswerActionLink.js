import React from 'react';

import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import LinkText from 'components/typography/LinkText';
import { getAnswerAction } from 'core/answerStatus';
import { redirectToAnswerQuestion } from 'services/navigation';
import { ANSWER_STATUS } from 'constants/questionStatus';

const FreelancerAnswerActionLink = ({ answerStatus, questionId }) => {
  const { t } = useTranslation();
  const actionNeeded = getAnswerAction(answerStatus);
  if (!actionNeeded) {
    return '';
  }

  const redirectURL = answerStatus === ANSWER_STATUS.draft
    ? redirectToAnswerQuestion(questionId) : ''

  return (
    <LinkText to={redirectURL}>
      <StyledStatusChip
        className={'state'}
        label={t(`answerStatus:${actionNeeded}`)}
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

export default FreelancerAnswerActionLink;
