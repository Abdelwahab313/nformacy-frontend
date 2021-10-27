import React from 'react';
import { getServiceStatus } from 'core/serviceStatus';
import ServiceActionLink from 'templates/services/ServiceActionLink';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import ServiceManager from 'core/serviceManager';
import MeetingAlarm from 'components/feedback/MeetingAlarm';
import QuestionManager from 'core/questionManager';

const parseServicesToTableRows = (services, t) => {
  return services?.map((service) => ({
    rowServiceId: service.serviceId,
    rowServiceState: service.serviceState,
    rowQuestionId: service.questionId,

    serviceRef:
      (service.activityType === 'meeting' && service.assignmentType !== 'mentoring')
        ? service.meetingRef
        : service.serviceRef,
    serviceOwner: service?.serviceOwner,
    clientId: service.userId,
    requestType:
      service.activityType === 'meeting'
        ? t('call')
        : t(`${service.assignmentType}`),
    createdAt: new Date(service.createdAt),
    title: service.title,
    fields: service.fields,
    language: service.language?.toUpperCase(),
    answersCount: service.answersCount,
    questionRef: service.questionRef || '',
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
        meetingState={
          service.activityType === 'meeting' && service.meetingState
        }
        hasEvaluationSubmitted={service.hasEvaluationSubmitted}
      />
    ),
    actionTime: ServiceManager.getServiceTime(service),
    alarm:
      service.activityType === 'meeting' ? (
        <MeetingAlarm meetingTime={service.meetingTime} />
      ) : (
        <QuestionRemainingTimeAlarm
          remainingTime={ServiceManager.getServiceTime(service)}
          totalActionHours={QuestionManager.getTotalActionTime(
            service.questionState,
            service.hoursToReviewAndEdit,
            service.hoursToCloseAnswers,
          )}
          className={'alarm'}
          data-reference={service.serviceId}
        />
      ),
  }));
};

export default parseServicesToTableRows;
