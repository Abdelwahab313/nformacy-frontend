import React from 'react';
import LinkText from 'components/typography/LinkText';
import { getServiceDetailsLink } from 'services/navigation';
import PointsLogManager from 'core/pointsLogManager';

const PointingActivityLink = ({ pointingActivity, serviceId }) => {
  return (
    <LinkText to={getServiceDetailsLink(serviceId)}>
      {PointsLogManager.getPointingActivityString(pointingActivity)}
    </LinkText>
  );
};

export default PointingActivityLink;
