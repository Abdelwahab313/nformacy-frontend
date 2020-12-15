import React from 'react';

import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import LinkText from 'components/typography/LinkText';
import { getAnswerAction } from 'core/answerStatus';
import { useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

const FreelancerAnswerActionLink = ({ answerStatus, questionId }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const actionNeeded = getAnswerAction(answerStatus);
  if (!actionNeeded) {
    return '';
  }

  // const answerAction = {
  //   [ANSWER_STATUS.draft]: {
  //     onClick: () => {
  //       history.push({
  //         pathname: RoutesPaths.App.AnswerQuestion,
  //         state: {
  //           questionDetails: {
  //             id: questionId,
  //           },
  //         },
  //       })
  //     }
  //   },
  //   [ANSWER_STATUS.rated]: {
  //     onClick: () => { history.push(getAnswerQuestionLink(questionId)) }
  //   },
  //   [ANSWER_STATUS.shortlisted]: {
  //     onClick: () => { history.push(getAnswerQuestionLink(questionId)) }
  //   },
  //   [ANSWER_STATUS.clientSelected]: {
  //     onClick: () => { history.push(getAnswerQuestionLink(questionId)) }
  //   }
  // }
  return (
    <LinkText onClick={() => {
      history.push({
        pathname: RoutesPaths.App.AnswerQuestion,
        state: {
          questionDetails: {
            id: questionId,
          },
        },
      })
    }}>
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
