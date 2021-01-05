import CallEvaluationActionTypes from './actionTypes';

export const updateEvaluationForm = (dispatch, ratingEvaluations) => {
  dispatch({
    type: CallEvaluationActionTypes.UPDATE_RATINGS,
    payload: ratingEvaluations,
  });
};

export const updateEvaluationComment = (dispatch, comment) => {
  dispatch({
    type: CallEvaluationActionTypes.UPDATE_COMMENT,
    payload: comment,
  });
};

export const updateCallEvaluationData = (dispatch, callEvaluationData) => {
  dispatch({
    type: CallEvaluationActionTypes.UPDATE_RATINGS_VIEWS,
    payload: callEvaluationData,
  });
};