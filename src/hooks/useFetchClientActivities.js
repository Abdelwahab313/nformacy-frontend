import { useMemo } from 'react';
import { fetchClientActivities } from 'apis/homeAPI';
import useFetchData from './useFetchData';

const useFetchClientActivities = () => {
  const { fetchedData, isLoading } = useFetchData(fetchClientActivities);

  const activities = useMemo(() => {
    if (!isLoading) {
      const formattedServices = formatServicesToActivity(fetchedData.services);
      const formattedMeetings = formatMeetingsToActivity(fetchedData.meetings);
      return [...formattedServices, ...formattedMeetings];
    }
  }, [fetchedData, isLoading]);

  return {
    activities,
    isLoading,
  };
};

const formatServicesToActivity = (services) => {
  if (!(services?.length >= 0)) {
    return [];
  }
  return services?.map((service) => ({
    activityType: 'service',
    serviceId: service.id,
    serviceRef: service?.referenceNumber,
    userId: service.userId,
    assignmentType: service.assignmentType,
    createdAt: service.createdAt,
    title: service.title,
    fields: service.fields,
    language: service.language,
    answersCount: service.question?.answers?.length,
    questionRef: service.question?.referenceNumber,
    questionId: service.question?.id,
    questionState: service.question?.state,
    serviceState: service?.state,
    currentActionTime: service.question?.currentActionTime,
    meetingId: service.assignmentType === 'call' && service.meetings[0]?.id,
    meetingState: service.meetings[0]?.state,
    meetingRef: service.meetings[0]?.referenceNumber,
    meetingTime: service.meetings[0]?.callTime,
    hasEvaluationSubmitted: !!service.meetings[0]?.clientEvaluationId,
  }));
};

const formatMeetingsToActivity = (meetings) => {
  if (!(meetings?.length >= 0)) {
    return [];
  }
  return meetings?.map((meeting) => ({
    activityType: 'meeting',
    serviceId: meeting?.serviceId,
    serviceRef: meeting.service?.referenceNumber,
    userId: meeting.clientId,
    assignmentType: meeting.service?.assignmentType,
    createdAt: meeting.createdAt,
    title: meeting.service?.title,
    fields: meeting.service?.question?.fields,
    language: '',
    answersCount: '',
    questionRef: meeting.service?.question?.referenceNumber,
    questionId: meeting.service?.question.id,
    questionState: '',
    serviceState: meeting.service?.state,
    meetingState: meeting.state,
    currentActionTime: meeting.service?.question?.currentActionTime,
    meetingId: meeting.id,
    meetingRef: meeting.referenceNumber,
    meetingTime: meeting.callTime,
    hasEvaluationSubmitted: !!meeting.clientEvaluationId,
  }));
};

export default useFetchClientActivities;
