import React from 'react';
import {
  getServiceDetailsLink,
  getAnswerQuestionLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';

export const ActivityRefLink = ({
  activityType,
  serviceId,
  questionId,
  referenceId,
}) => {
  let redirectURL = () => {
    if (activityType === 'answer') {
      return getAnswerQuestionLink(questionId);
    } else {
      return getServiceDetailsLink(serviceId);
    }
  };

  if (!referenceId) {
    return '';
  }
  return <LinkText to={redirectURL()}>{`#${referenceId}`}</LinkText>;
};

export default ActivityRefLink;
