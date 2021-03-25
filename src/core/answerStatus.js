import { answerActions } from 'constants/questionStatus';

export const getAnswerAction = (answerStatus) => {
  return answerActions[answerStatus]?.action?.freelancer;
};

export const getAnswerState = (answerStatus) => {
  return answerActions[answerStatus]?.status?.displayString;
};
