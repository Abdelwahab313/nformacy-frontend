import QuestionRoasterActionTypes from './actionTypes';

export const updateFetchedQuestions = (dispatch, questions) => {
  dispatch({
    type: QuestionRoasterActionTypes.UPDATE_QUESTIONS,
    payload: questions,
  });
};

export const addFieldFilter = (dispatch, fieldId) => {
  dispatch({
    type: QuestionRoasterActionTypes.ADD_FIELD_FILTER,
    payload: fieldId,
  });
};

export const removeFieldFilter = (dispatch, fieldId) => {
  dispatch({
    type: QuestionRoasterActionTypes.REMOVE_FIELD_FILTER,
    payload: fieldId,
  });
};

export const addLanguageFilter = (dispatch, language) => {
  dispatch({
    type: QuestionRoasterActionTypes.ADD_LANGUAGE_FILTER,
    payload: language,
  });
};

export const resetFieldsFilters = (dispatch) => {
  dispatch({
    type: QuestionRoasterActionTypes.RESET_FIELDS_FILTERS,
  });
};
