import { useMemo } from 'react';
import { fetchFreelancerActivities } from 'apis/homeAPI';
import useFetchData from './useFetchData';

const useFetchFreelancerActivities = () => {
  const { fetchedData, isLoading } = useFetchData(fetchFreelancerActivities);

  const activities = useMemo(() => {
    if (!isLoading) {
      const formattedAnswers = formatAnswersToTable(fetchedData.answers);
      const formattedMeetings = formatMeetingsToTable(fetchedData.meetings);
      return [...formattedAnswers];
    }
  }, [fetchedData, isLoading]);

  return {
    activities,
    isLoading,
  };
};

const formatAnswersToTable = (answers) => {
  if (!(answers?.length >= 0)) {
    return [];
  }
  return answers?.map((answer) => ({
    activityType: 'answer',
    id: answer.id,
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

const formatMeetingsToTable = (meetings) => {
  if (!(meetings?.length >= 0)) {
    return [];
  }
  return meetings?.map((meeting) => ({
    activityType: 'meeting',
    id: meeting.serviceId,
    questionId: meeting.service.question.id,
    questionRef: meeting.service.question.referenceNumber,
    answerRef: null,
    answerState: null,
    questionState: meeting.service.question.state,
    serviceState: meeting.service.state,
    serviceRef: meeting.service?.referenceNumber,
    questionTime: meeting.service.question.currentActionTime,
    assignmentType: meeting.service.assignmentType,
    title: meeting.service.title,
    createdAt: meeting.createdAt,
    fields: meeting.service.question.fields,
  }));
};

export default useFetchFreelancerActivities;
