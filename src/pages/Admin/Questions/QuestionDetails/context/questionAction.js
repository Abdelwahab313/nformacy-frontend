import QuestionActionTypes from './actionTypes';

export const updateQuestionDetails = (dispatch, question) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_QUESTION,
    payload: question,
  });
};

export const updateQuestionField = (dispatch, name, value) => {
  dispatch({
    type: QuestionActionTypes.UPDATE_QUESTION_FIELD,
    payload: { [name]: value },
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

export const resetModifiedState = (dispatch) => {
  dispatch({
    type: QuestionActionTypes.RESET_MODIFIED_STATE,
  });
};
