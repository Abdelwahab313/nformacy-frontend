import {
  questionStatusActions,
  QUESTION_STATUS,
  serviceActions,
  SERVICE_STATUS,
} from 'constants/questionStatus';
import { USER_TYPES } from 'constants/userRoles';
import authManager from 'services/authManager';
import { getMeetingState } from './meeting';

export const getServiceStatus = (
  status,
  questionState,
  meetingState,
  hasEvaluationSubmitted,
  hasRelatedMeeting,
) => {
  if (!!hasRelatedMeeting && !authManager.isCorporate()) {
    return getMeetingState(meetingState, hasEvaluationSubmitted);
  }
  if (isAnsweringState(questionState) && authManager.isClient()) {
    return 'client_collecting_answers_status';
  }
  if (status === SERVICE_STATUS.questionStarted && authManager.isAdmin()) {
    return questionStatusActions[questionState].status.displayString;
  }
  let currentUserRole = authManager.getUserRole();
  if (currentUserRole === USER_TYPES.corporate) {
    currentUserRole = USER_TYPES.client;
  }

  return serviceActions[status]?.status[currentUserRole];
};

export const getServiceAction = (status, questionState) => {
  if (isAnsweringState(questionState) && authManager.isClient()) {
    return 'client_collecting_answers_action';
  }
  if (status === SERVICE_STATUS.questionStarted && authManager.isAdmin()) {
    return questionStatusActions[questionState].action.admin;
  }
  const currentUserRole = authManager.getUserRole();
  return serviceActions[status]?.action[currentUserRole];
};

export const isAnsweringState = (questionState) => {
  return (
    questionState === QUESTION_STATUS.answersRating ||
    questionState === QUESTION_STATUS.freelancerAnswers
  );
};
