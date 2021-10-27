import { useMemo } from 'react';
import { fetchFreelancerActivities } from 'apis/homeAPI';
import useFetchData from './useFetchData';
import { MEETING_STATUS } from 'constants/questionStatus';

const sortByRecentlyUpdated = (arr) => {
  return arr.sort((a, b) => {
    var keyA = new Date(a.updatedAt),
      keyB = new Date(b.updatedAt);
    // Compare the 2 dates
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
};

const useFetchFreelancerActivities = () => {
  const { fetchedData, isLoading } = useFetchData(fetchFreelancerActivities);

  const activities = useMemo(() => {
    if (!isLoading) {
      const formattedAnswers = formatAnswersToActivity(fetchedData.answers);
      const formattedMeetings = formatMeetingsToActivity(fetchedData.meetings);
      const fetchedMentorServices = formatMentoringToActivity(fetchedData.mentorServices);
      return sortByRecentlyUpdated([
        ...formattedAnswers,
        ...formattedMeetings,
        ...fetchedMentorServices,
      ]);
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
    updatedAt: answer.updatedAt,
    serviceId: answer.question?.service?.id,
    questionId: answer.question?.id,
    questionRef: answer.question?.referenceNumber,
    answerRef: answer.referenceNumber,
    answerState: answer.state,
    questionState: answer.question.state,
    serviceState: answer.question.service?.state,
    serviceRef: answer.question.service?.referenceNumber,
    questionTime: answer.question?.currentActionTime,
    assignmentType: answer.question?.assignmentType,
    title: answer.question?.title,
    createdAt: answer.question?.createdAt,
    fields: answer.question?.fields,
  }));
};

const formatMeetingsToActivity = (meetings) => {
  if (!(meetings?.length >= 0)) {
    return [];
  }
  return meetings?.map((meeting) => ({
    activityType: 'meeting',
    serviceId: meeting.serviceId,
    questionId: meeting.service?.question?.id,
    meetingId: meeting.id,
    updatedAt: meeting.updatedAt,
    questionRef: meeting.service?.question?.referenceNumber,
    answerRef: null,
    answerState: null,
    questionState: meeting.service?.question?.state,
    serviceState: meeting.service?.state,
    serviceRef: meeting.service?.referenceNumber,
    questionTime: meeting.service?.question?.currentActionTime,
    assignmentType: meeting.service?.assignmentType,
    title: meeting.service?.title,
    createdAt: meeting.createdAt,
    fields: meeting.service?.question?.fields,
    meetingState: meeting.state,
    meetingRef: meeting.referenceNumber,
    meetingTime:
      meeting.state === MEETING_STATUS.callScheduled && meeting.callTime,
    hasEvaluationSubmitted: !!meeting.freelancerEvaluationId,
  }));
};

const formatMentoringToActivity = (mentorServices) => {
  if (!(mentorServices?.length >= 0)) {
    return [];
  }
  return mentorServices?.map((mentorService) => ({
    activityType: 'mentoring',
    serviceId: mentorService.id,
    questionId: mentorService.question?.id,
    updatedAt: mentorService.updatedAt,
    answerRef: null,
    answerState: null,
    questionState: mentorService?.question?.state,
    serviceState: mentorService?.state,
    serviceRef: mentorService.referenceNumber,
    questionTime: mentorService?.currentActionTime,
    assignmentType: mentorService?.assignmentType,
    title: mentorService?.title,
    createdAt: mentorService.createdAt,
    fields: mentorService?.fields,
    meetingState: mentorService.state,
    meetingRef: mentorService.referenceNumber,
    meetingTime:
      mentorService.state === MEETING_STATUS.callScheduled && mentorService?.meetings?.[0]?.callTime,
    hasEvaluationSubmitted: !!mentorService.freelancerEvaluationId,
  }));
};

export default useFetchFreelancerActivities;
