import QuestionActionTypes from './actionTypes';

export const updateQuestionDetails = (dispatch, question) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_QUESTION,
    payload: question,
  });
};

export const setErrorMessage = (dispatch, message) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_ERROR_MESSAGE,
    payload: message,
  });
};

export const setSuccessMessage = (dispatch, message) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_SUCCESS_MESSAGE,
    payload: message,
  });
};

export const setEmptyMessage = (dispatch) => {
    dispatch({
      type: QuestionActionTypes.EMPTY_MESSAGE,
    });
  };