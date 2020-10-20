import QuestionActionTypes from './actionTypes';

export const updateQuestionDetails = (dispatch, question) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_QUESTION,
    payload: question,
  });
};
