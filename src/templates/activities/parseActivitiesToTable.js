import React from 'react';
import { getAnswerQuestionLink } from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import { getAnswerState } from 'core/answerStatus';
import FieldsChips from 'components/chips/FieldsChips';
import FreelancerAnswerActionLink from 'templates/answers/FreelancerAnswerActionLink';
import { getServiceStatus } from 'core/serviceStatus';
import ServiceActionLink from 'templates/services/ServiceActionLink';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import MeetingAlarm from 'components/feedback/MeetingAlarm';

const parseActivitiesToTableRow = (activities, t) => {
  return activities?.map((activity) => ({
    questionId: activity.questionId,
    servcieId: activity.serviceId,
    activityType: activity.activityType,

    activityRef:
      activity.activityType === 'answer'
        ? activity.questionRef
        : activity.serviceRef,
    requestType: (function() {
      if (activity.activityType === 'answer')
        return t(`screening_${activity.assignmentType}`);
      else if (activity.activityType === 'mentoring') return t('mentoring');
      else return t('call');
    })(),
    title: activity.title,
    date: new Date(activity.createdAt),
    fields: <FieldsChips fields={activity.fields} />,
    answerRef:
      activity.activityType === 'answer' ? (
        <LinkText to={getAnswerQuestionLink(activity.questionId)}>
          {`#${activity.answerRef}`}
        </LinkText>
      ) : (
        ''
      ),
    status:
      activity.activityType === 'answer'
        ? t(`answerStatus:${getAnswerState(activity.answerState)}`)
        : t(
            `serviceStatus:${getServiceStatus(
              activity.serviceState,
              activity.questionState,
              activity.meetingState,
              activity.hasEvaluationSubmitted,
              !!activity.meetingId,
            )}`,
          ),
    action:
      activity.activityType === 'answer' ? (
        <FreelancerAnswerActionLink
          answerStatus={activity.answerState}
          questionId={activity.questionId}
        />
      ) : (
        <ServiceActionLink
          serviceId={activity.serviceId}
          questionId={activity.questionId}
          status={activity.serviceState}
          questionState={activity.questionState}
          meetingId={activity.meetingId}
          meetingState={activity.meetingState}
          hasEvaluationSubmitted={activity.hasEvaluationSubmitted}
        />
      ),
    time:
      activity.type === 'answer'
        ? activity?.questionTime
        : activity?.meetingTime,
    timeAlarm:
      activity.type === 'answer' ? (
        <QuestionRemainingTimeAlarm
          remainingTime={activity?.questionTime}
          totalActionHours={10}
          className={'alarm'}
        />
      ) : (
        <MeetingAlarm meetingTime={activity.meetingTime} />
      ),
  }));
};

export default parseActivitiesToTableRow;
