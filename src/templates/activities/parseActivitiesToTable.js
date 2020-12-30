import React from 'react';
import { getAnswerQuestionLink } from 'services/navigation';
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

const parseActivitiesToTableRow = (activities, t) => {
  return activities?.map((activity) => ({
    id: `#${activity.answerId}`,
    activityId:
      activity.activityType === 'answer'
        ? `#${activity.questionRef}`
        : `#${activity.serviceRef}`,
    requestType:
      activity.activityType === 'answer'
        ? t(`screening_${activity.assignmentType}`)
        : t('call'),
    title: (
      <LinkText to={getAnswerQuestionLink(activity.questionId)}>
        <TextCroppedWithTooltip text={activity.title} />
      </LinkText>
    ),
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
        />
      ),
    time: !!activity?.questionTime ? (
      <FreelancerAnswerTime currentActionTime={activity?.questionTime} />
    ) : null,
    timeAlarm: (
      <QuestionRemainingTimeAlarm
        remainingTime={activity?.questionTime}
        totalActionHours={10}
        className={'alarm'}
      />
    ),
  }));
};

export default parseActivitiesToTableRow;
