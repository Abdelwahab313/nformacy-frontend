import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import { getServiceAction } from 'core/serviceStatus';
import {
  getQuestionDetailsLink,
  getServiceDetailsLink,
  getCallEvaluationLink,
} from 'services/navigation';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { getMeetingAction } from 'core/meeting';

const ServiceActionLink = ({
  status,
  serviceId,
  questionId,
  questionState,
  meetingId,
  meetingState,
  hasEvaluationSubmitted,
}) => {
  const { t } = useTranslation();
  const hasRelatedQuestion = !!questionId;
  const hasRelatedMeeting = !!meetingId;
  let actionNeeded;
  if (hasRelatedMeeting) {
    actionNeeded = getMeetingAction(meetingState, hasEvaluationSubmitted);
  } else {
    actionNeeded = getServiceAction(status, questionState);
  }
  if (!actionNeeded) {
    return '';
  }

  let redirectURL = () => {
    if (meetingState === SERVICE_STATUS.callFinished) {
      return getCallEvaluationLink(meetingId, serviceId);
    } else if (hasRelatedQuestion) {
      return getQuestionDetailsLink(questionId, serviceId);
    } else {
      return getServiceDetailsLink(serviceId);
    }
  };
  return (
    <LinkText to={redirectURL()}>
      <StyledStatusChip
        data-status={status}
        className={'state'}
        data-reference={serviceId}
        label={t(`serviceStatus:${actionNeeded}`)}
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

export default ServiceActionLink;
