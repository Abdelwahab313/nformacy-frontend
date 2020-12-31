import React from 'react';
import {
  getQuestionDetailsLink,
  getServiceDetailsLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import FieldsChips from 'components/chips/FieldsChips';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { getServiceStatus } from 'core/serviceStatus';
import ServiceActionLink from 'templates/services/ServiceActionLink';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import CustomTypography from 'components/typography/Typography';
import { Typography } from '@material-ui/core';
import ByTimeField from 'pages/Admin/Questions/list/subComponents/ByTimeField';

const parseServicesToTableRows = (services, t) => {
  return services?.map((service) => ({
    serviceId: service.serviceId,
    serviceRef: (
      <ServiceRefIdLink
        serviceId={service.serviceId}
        referenceId={service.serviceRef}
      />
    ),
    clientId: service.userId,
    requestType:
      service.activityType === 'meeting'
        ? t('call')
        : t(`screening_${service.assignmentType}`),
    createdAt: (
      <CustomTypography variant='body2' gutterBottom>
        {formattedDateTimeNoSeconds(new Date(service.createdAt))}
      </CustomTypography>
    ),
    title: <TextCroppedWithTooltip text={service.title} />,
    fields: <FieldsChips fields={service.fields} />,
    language: (
      <Typography
        // className={classes.answersCount}
        variant='body1'
        gutterBottom>
        {service.language?.toUpperCase()}
      </Typography>
    ),
    answersCount: (
      <Typography
        // className={classes.answersCount}
        variant='body1'
        gutterBottom>
        {service.answersCount}
      </Typography>
    ),
    questionRef: !!service.questionRef ? (
      <LinkText
        data-reference={service.serviceRef}
        to={getQuestionDetailsLink(service.questionId, service.serviceId)}>
        {`#${service.questionRef}`}
      </LinkText>
    ) : (
      ''
    ),
    status: !!service.serviceState
      ? t(
          `serviceStatus:${getServiceStatus(
            service.serviceState,
            service.questionState,
          )}`,
        )
      : '',
    action: (
      <ServiceActionLink
        status={service.serviceState}
        serviceId={service.serviceId}
        questionId={service.questionId}
        questionState={service.questionState}
        meetingId={service.meetingId}
      />
    ),
    actionTime: !!service.currentActionTime ? (
      <ByTimeField
        currentActionTime={service?.currentActionTime}
        referenceId={service.serviceId}
        questionId={service.questionId}
      />
    ) : null,
    alarm: (
      <QuestionRemainingTimeAlarm
        remainingTime={service.currentActionTime}
        totalActionHours={10}
        className={'alarm'}
        data-reference={service.serviceId}
      />
    ),
  }));
};

export const ServiceRefIdLink = ({ serviceId, referenceId }) => {
  if (!referenceId) {
    return '';
  }
  return (
    <LinkText data-reference={serviceId} to={getServiceDetailsLink(serviceId)}>
      <TextCroppedWithTooltip text={`#${referenceId}`} />
    </LinkText>
  );
};

export default parseServicesToTableRows;
