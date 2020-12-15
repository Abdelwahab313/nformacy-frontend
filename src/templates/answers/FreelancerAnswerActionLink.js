import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { getAnswerAction } from 'core/answerStatus';
import { useHistory } from 'react-router';
import { Box } from '@material-ui/core';
import { ANSWER_STATUS } from 'constants/questionStatus';
import { getAnswerQuestionLink } from 'services/navigation';
import AvailableTimesCalendarDialog from 'components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';

const FreelancerAnswerActionLink = ({ answerStatus, questionId }) => {
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();
  const actionNeeded = getAnswerAction(answerStatus);
  if (!actionNeeded) {
    return '';
  }

  const answerAction = {
    [ANSWER_STATUS.draft]: {
      onClick: () => {
        history.push(getAnswerQuestionLink(questionId));
      },
    },
    [ANSWER_STATUS.rated]: {
      onClick: () => {
        history.push(getAnswerQuestionLink(questionId));
      },
    },
    [ANSWER_STATUS.shortlisted]: {
      onClick: () => {
        setIsCalendarDialog(true);
      },
    },
    [ANSWER_STATUS.clientSelected]: {
      onClick: () => {
        history.push(getAnswerQuestionLink(questionId));
      },
    },
  };

  return (
    <>
      <Box onClick={() => answerAction[answerStatus]?.onClick()}>
        <StyledStatusChip
          className={'state'}
          label={t(`answerStatus:${actionNeeded}`)}
        />
      </Box>
      <AvailableTimesCalendarDialog
        open={isCalendarDialogOpen}
        closeDialog={() => {
          setIsCalendarDialog(false);
        }}
      />
    </>
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
