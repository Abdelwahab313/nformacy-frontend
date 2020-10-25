import QuestionRoasterActionTypes from './actionTypes';

export const updateFetchedQuestions = (dispatch, questions) => {
  dispatch({
    type: QuestionRoasterActionTypes.UPDATE_QUESTIONS,
    payload: questions,
  });
};

export const addFieldFilter = (dispatch, field) => {
  dispatch({
    type: QuestionRoasterActionTypes.ADD_FIELD_FILTER,
    payload: field,
  });
};

export const removeFieldFilter = (dispatch, field) => {
  dispatch({
    type: QuestionRoasterActionTypes.REMOVE_FIELD_FILTER,
    payload: field,
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
