import { useMemo } from 'react';
import { fetchCorporateActivities } from 'apis/homeAPI';
import useFetchData from './useFetchData';
import { getUserName } from 'core/user';

const useFetchCorporateActivities = (userId) => {
  const { fetchedData, isLoading } = useFetchData(() => fetchCorporateActivities(userId));

  const activities = useMemo(() => {
    if (!isLoading) {
      const formattedServices = formatServicesToActivity(fetchedData.services);
      return [...formattedServices];
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
    serviceOwner: getUserName(service?.user),
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

export default useFetchCorporateActivities;
