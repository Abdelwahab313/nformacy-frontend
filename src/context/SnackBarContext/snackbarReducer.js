import SnackBarActionTypes from './actionTypes';

const SnackBarReducer = (state, action) => {
  switch (action.type) {
    case SnackBarActionTypes.UPDATE_SUCCESS_MESSAGE:
      return { ...state, isError: false, message: action.payload };

    case SnackBarActionTypes.UPDATE_ERROR_MESSAGE:
      return { ...state, isError: true, message: action.payload };

    case SnackBarActionTypes.EMPTY_MESSAGE:
      return { ...state, message: '' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default SnackBarReducer;
