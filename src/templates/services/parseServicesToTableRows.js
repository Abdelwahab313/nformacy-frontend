import React from 'react';
import { getQuestionDetailsLink, getServiceDetailsLink } from 'services/navigation';
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
    id: service.id,
    serviceRef: (
      <ServiceRefIdLink
        serviceId={service.id}
        referenceId={service.referenceNumber}
      />
    ),
    clientId: service.userId,
    requestType: t(service.assignmentType),
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
    questionRef: !!service.questionReferenceId ? (
      <LinkText
        data-reference={service.referenceNumber}
        to={getQuestionDetailsLink(service.questionId, service.id)}>
        {`#${service.questionReferenceId}`}
      </LinkText>
    ) : (
        ''
      ),
    status: t(
      `serviceStatus:${getServiceStatus(service.state, service.questionState)}`,
    ),
    action: (
      <ServiceActionLink
        status={service.state}
        serviceId={service.id}
        questionId={service.questionId}
        questionState={service.questionState}
        meetingId={service.meetingId}
      />
    ),
    actionTime: !!service.currentActionTime ? (
      <ByTimeField
        currentActionTime={service?.currentActionTime}
        referenceId={service.id}
        questionId={service.questionId}
      />
    ) : null,
    alarm: (
      <QuestionRemainingTimeAlarm
        remainingTime={service.currentActionTime}
        totalActionHours={10}
        className={'alarm'}
        data-reference={service.id}
      />
    ),
  }));
};

export const ServiceRefIdLink = ({ serviceId, referenceId }) => {
  return (
    <LinkText data-reference={serviceId} to={getServiceDetailsLink(serviceId)}>
      <TextCroppedWithTooltip text={`#${referenceId}`} />
    </LinkText>
  );
};

export default parseServicesToTableRows;
