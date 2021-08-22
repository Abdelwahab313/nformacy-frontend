import React from 'react';
import {
  getAnswerQuestionLink,
  getServiceDetailsLink,
} from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import { getAnswerState } from 'core/answerStatus';
import FieldsChips from 'components/chips/FieldsChips';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import FreelancerAnswerActionLink from 'templates/answers/FreelancerAnswerActionLink';
import FreelancerAnswerTime from 'templates/answers/FreelancerAnswerTime';
import { getServiceStatus } from 'core/serviceStatus';
import ServiceActionLink from 'templates/services/ServiceActionLink';
import QuestionRemainingTimeAlarm from 'components/feedback/QuestionRemainingTimeAlarm';
import CustomTypography from 'components/typography/Typography';
import MeetingAlarm from 'components/feedback/MeetingAlarm';

const parseActivitiesToTableRow = (activities, t) => {
  return activities?.map((activity) => ({
    id: `#${activity.answerId}`,
    activityId:
      activity.activityType === 'answer' ? (
        <LinkText to={getAnswerQuestionLink(activity.questionId)}>
          {`#${activity.questionRef}`}
        </LinkText>
      ) : (
        <LinkText to={getServiceDetailsLink(activity.serviceId)}>
          {`#${activity.serviceRef}`}
        </LinkText>
      ),

    requestType: (function() {
      if (activity.activityType === 'answer')
        return t(`screening_${activity.assignmentType}`);
      else if (activity.activityType === 'mentoring') return t('mentoring');
      else return t('call');
    })(),
    title: <TextCroppedWithTooltip text={activity.title} />,
    date: (
      <CustomTypography variant='body2' gutterBottom>
        {formattedDateTimeNoSeconds(new Date(activity.createdAt))}{' '}
      </CustomTypography>
    ),
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
    time: (
      <FreelancerAnswerTime
        currentActionTime={
          activity.type === 'answer'
            ? activity?.questionTime
            : activity?.meetingTime
        }
      />
    ),
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
