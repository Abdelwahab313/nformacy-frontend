import { SERVICE_STATUS, meetingStatusActions } from 'constants/questionStatus';
import authManager from 'services/authManager';
import moment from 'moment';
import { formatTime } from 'services/dateTimeParser';

export const MEETING_TYPES = {
  CallService: 'call_service',
  QuestionService: 'question_service',
  ConsultantScreening: 'consultant_screening'
};

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
  return meetingStatusActions[meetingStateKey]?.status[currentUserRole];
};

export const getMeetingAction = (meetingState, hasEvaluationSubmitted) => {
  const meetingStateKey = getMeetingStateKey(
    meetingState,
    hasEvaluationSubmitted,
  );
  const currentUserRole = authManager.getUserRole();
  return meetingStatusActions[meetingStateKey]?.action[currentUserRole];
};

export const endCallTime = (callTime) => {
  const endTime = moment(callTime).add(1, 'hours');
  return formatTime(new Date(endTime));
};
