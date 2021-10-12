import React from 'react';
import {
  getServiceDetailsLink,
  getEditServiceDetailsLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import { EDITABLE_SERVICE_STATUS } from 'constants/questionStatus';

export const ServiceRefLink = ({ serviceState, serviceId, referenceId }) => {
  let redirectURL = () => {
    if (EDITABLE_SERVICE_STATUS.includes(serviceState)) {
      return getEditServiceDetailsLink(serviceId);
    } else {
      return getServiceDetailsLink(serviceId);
    }
  };

  if (!referenceId) {
    return '';
  }
  return (
    <LinkText data-reference={serviceId} to={redirectURL()}>
      {`#${referenceId}`}
    </LinkText>
  );
};

export default ServiceRefLink;
