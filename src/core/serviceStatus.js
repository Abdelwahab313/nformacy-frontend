import {
  questionStatusActions,
  QUESTION_STATUS,
  serviceActions,
  SERVICE_STATUS,
} from 'constants/questionStatus';
import authManager from 'services/authManager';

export const getServiceStatus = (status, questionState) => {
  if (isAnsweringState(questionState) && authManager.isClient()) {
    return 'client_collecting_answers_status';
  }
  if (status === SERVICE_STATUS.questionStarted && authManager.isAdmin()) {
    return questionStatusActions[questionState].status.displayString;
  }
  const currentUserRole = authManager.getUserRole();
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
