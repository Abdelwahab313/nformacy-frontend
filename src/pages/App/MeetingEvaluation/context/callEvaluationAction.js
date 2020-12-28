import CallEvaluationActionTypes from "./actionTypes";

export const updateEvaluationForm = (dispatch, ratingEvaluations) => {
  dispatch({
    type: CallEvaluationActionTypes.UPDATE_EVALUATION,
    payload: ratingEvaluations,
  });
};