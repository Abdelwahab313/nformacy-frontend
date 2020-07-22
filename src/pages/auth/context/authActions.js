import { AuthActionTypes } from './auth';

export const updateUser = (dispatch, user) => {
  dispatch({
    type: AuthActionTypes.UPDATE_CURRENT_USER,
    payload: user,
  });
};

export const logoutUser = (dispatch) => {
  dispatch({
    type: AuthActionTypes.LOGOUT_USER,
  });
};
