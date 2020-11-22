import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { useTranslation } from 'react-i18next';
import LinkText from 'components/typography/LinkText';
import { getServiceAction } from 'core/serviceStatus';
import {
  getQuestionDetailsLink,
  getServiceDetailsLink,
} from 'services/navigation';

const ServiceActionLink = ({
  status,
  serviceId,
  questionId,
  questionState,
}) => {
  const { t } = useTranslation();
  const actionNeeded = getServiceAction(status, questionState);
  if (!actionNeeded) {
    return '';
  }

  const redirectURL = !!questionId
    ? getQuestionDetailsLink(questionId)
    : getServiceDetailsLink(serviceId);
  return (
    <LinkText to={redirectURL}>
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
