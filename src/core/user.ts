import { User } from './types';

export const getUserName = (user: User) => {
  return `${user?.firstName[0]}. ${user?.lastName}`;
};

export const getConsultantLevel = (user: User): number => {
  const completeRegistrationStep = 1;
  const submitFullProfileStep = 2;
  const MeetWithAdminStep = 3;
  const pendingApprovalStep = 4;
  if (!user.completedProfile) {
    return completeRegistrationStep;
  } else if (!user.hasFullProfile) {
    return submitFullProfileStep;
  } else if (!hasReviewMeetingScheduled()) {
    return MeetWithAdminStep;
  } else if (hasReviewMeetingFinished()) {
    return pendingApprovalStep;
  }
  return 0;
};

const hasReviewMeetingScheduled = () => {
  return false;
};
const hasReviewMeetingFinished = () => {
  return false;
};
