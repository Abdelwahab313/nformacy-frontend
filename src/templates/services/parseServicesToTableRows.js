import React from 'react';
import {
  getQuestionDetailsLink,
  getServiceDetailsLink,
  getEditServiceDetailsLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import FieldsChips from 'components/chips/FieldsChips';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import { getServiceStatus } from 'core/serviceStatus';
import ServiceActionLink from 'templates/services/ServiceActionLink';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import CustomTypography from 'components/typography/Typography';
import { Typography } from '@material-ui/core';
import { EDITABLE_SERVICE_STATUS } from 'constants/questionStatus';
import QuestionCountDown from 'components/counters/QuestionCountDown';
import MeetingAlarm from 'components/feedback/MeetingAlarm';

const parseServicesToTableRows = (services, t) => {
  return services?.map((service) => ({
    serviceId: service.serviceId,
    serviceRef:
      service.activityType === 'meeting' ? (
        <ServiceRefIdLink
          serviceState={service.serviceState}
          serviceId={service.serviceId}
          referenceId={service.meetingRef}
        />
      ) : (
        <ServiceRefIdLink
          serviceState={service.serviceState}
          serviceId={service.serviceId}
          referenceId={service.serviceRef}
        />
      ),
    clientId: service.userId,
    requestType:
      service.activityType === 'meeting'
        ? t('call')
        : t(`${service.assignmentType}`),
    createdAt: (
      <CustomTypography variant='body2' gutterBottom>
        {formattedDateMonthAndDay(new Date(service.createdAt))}
      </CustomTypography>
    ),
    title: <TextCroppedWithTooltip text={service.title} maxChar={15} />,
    fields: <FieldsChips fields={service.fields} />,
    language: (
      <Typography variant='body1' gutterBottom>
        {service.language?.toUpperCase()}
      </Typography>
    ),
    answersCount: (
      <Typography variant='body1' gutterBottom>
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
            service.meetingState,
            service.hasEvaluationSubmitted,
            !!service.meetingId,
          )}`,
        )
      : '',
    action: (
      <ServiceActionLink
        status={service.serviceState}
        serviceId={service.serviceId}
        questionId={service.questionId}
        questionState={service.questionState}
        meetingId={service.activityType === 'meeting' && service.meetingId}
        meetingState={service.activityType === 'meeting' && service.meetingState}
        hasEvaluationSubmitted={service.hasEvaluationSubmitted}
      />
    ),
    actionTime: (
      <QuestionCountDown
        date={
          service.activityType === 'meeting'
            ? service?.meetingTime
            : service?.currentActionTime
        }
        data-date={service?.meetingTime}
        showIcon={false}
        className={'currentActionTime'}
      />
    ),
    alarm:
      service.activityType === 'meeting' ? (
        <MeetingAlarm meetingTime={service.meetingTime} />
      ) : (
        <QuestionRemainingTimeAlarm
          remainingTime={service.currentActionTime}
          totalActionHours={10}
          className={'alarm'}
          data-reference={service.serviceId}
        />
      ),
  }));
};

export const ServiceRefIdLink = ({ serviceState, serviceId, referenceId }) => {
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
      <TextCroppedWithTooltip text={`#${referenceId}`} />
    </LinkText>
  );
};

export default parseServicesToTableRows;
