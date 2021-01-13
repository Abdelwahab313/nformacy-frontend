import { useMemo } from 'react';
import { fetchFreelancerActivities } from 'apis/homeAPI';
import useFetchData from './useFetchData';
import { MEETING_STATUS } from 'constants/questionStatus';

const useFetchFreelancerActivities = () => {
  const { fetchedData, isLoading } = useFetchData(fetchFreelancerActivities);

  const activities = useMemo(() => {
    if (!isLoading) {
      const formattedAnswers = formatAnswersToActivity(fetchedData.answers);
      const formattedMeetings = formatMeetingsToActivity(fetchedData.meetings);
      return [...formattedAnswers, ...formattedMeetings];
    }
  }, [fetchedData, isLoading]);

  return {
    activities,
    isLoading,
  };
};

const formatAnswersToActivity = (answers) => {
  if (!(answers?.length >= 0)) {
    return [];
  }
  return answers?.map((answer) => ({
    activityType: 'answer',
    answerId: answer.id,
    serviceId: answer.question.service.id,
    questionId: answer.question.id,
    questionRef: answer.question.referenceNumber,
    answerRef: answer.referenceNumber,
    answerState: answer.state,
    questionState: answer.question.state,
    serviceState: answer.question.service?.state,
    serviceRef: answer.question.service?.referenceNumber,
    questionTime: answer.question.currentActionTime,
    assignmentType: answer.question.assignmentType,
    title: answer.question.title,
    createdAt: answer.question.createdAt,
    fields: answer.question.fields,
  }));
};

const formatMeetingsToActivity = (meetings) => {
  if (!(meetings?.length >= 0)) {
    return [];
  }
  return meetings?.map((meeting) => ({
    activityType: 'meeting',
    serviceId: meeting.serviceId,
    questionId: meeting.service.question.id,
    meetingId: meeting.id,
    questionRef: meeting.service.question.referenceNumber,
    answerRef: null,
    answerState: null,
    questionState: meeting.service.question.state,
    serviceState: meeting.service?.state,
    serviceRef: meeting.service?.referenceNumber,
    questionTime: meeting.service.question.currentActionTime,
    assignmentType: meeting.service.assignmentType,
    title: meeting.service.title,
    createdAt: meeting.createdAt,
    fields: meeting.service.question.fields,
    meetingState: meeting.state,
    meetingRef: meeting.referenceNumber,
    meetingTime: (meeting.state === MEETING_STATUS.callScheduled) && meeting.callTime,
    hasEvaluationSubmitted: !!meeting.freelancerEvaluationId,
  }));
};

export default useFetchFreelancerActivities;
