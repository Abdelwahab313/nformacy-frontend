import { SERVICE_STATUS, meetingStatusActions } from 'constants/questionStatus';
import authManager from 'services/authManager';

export const getMeetingStateKey = (meetingState, hasEvaluationSubmitted) => {
  let meetingStateKey = '';
  if (meetingState === SERVICE_STATUS.callFinished && hasEvaluationSubmitted) {
    meetingStateKey = SERVICE_STATUS.closed;
  } else {
    meetingStateKey = meetingState;
  }
  return meetingStateKey;
};

export const getMeetingState = (meetingState, hasEvaluationSubmitted) => {
  const meetingStateKey = getMeetingStateKey(
    meetingState,
    hasEvaluationSubmitted,
  );
  const currentUserRole = authManager.getUserRole();
  return meetingStatusActions[meetingStateKey].status[currentUserRole];
};

export const getMeetingAction = (meetingState, hasEvaluationSubmitted) => {
  const meetingStateKey = getMeetingStateKey(
    meetingState,
    hasEvaluationSubmitted,
  );
  const currentUserRole = authManager.getUserRole();
  return meetingStatusActions[meetingStateKey].action[currentUserRole];
};
