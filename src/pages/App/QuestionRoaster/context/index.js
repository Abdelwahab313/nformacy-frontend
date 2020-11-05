import React, { createContext, useContext, useReducer } from 'react';
import QuestionRoasterActionTypes from './actionTypes';

const defaultValues = {
  questions: [],
  fieldsFilters: [],
  languageFilter: '',
};

const QuestionRoasterContext = createContext();

const QuestionRoasterProvider = ({ children, initialValue = {} }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = QuestionRoasterContext;
  return (
    <Provider value={useReducer(QuestionRoasterReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useQuestionRoasterContext = () => {
  const context = useContext(QuestionRoasterContext);
  if (context === undefined) {
    throw new Error(
      'useQuestionRoasterContext must be used within a QuestionRoasterContext',
    );
  }
  return context;
};

const QuestionRoasterReducer = (state, action) => {
  switch (action.type) {
    case QuestionRoasterActionTypes.UPDATE_QUESTIONS:
      return { ...state, questions: [...action.payload] };
    case QuestionRoasterActionTypes.ADD_FIELD_FILTER:
      const newFilters = [...state.fieldsFilters];
      if (!state.fieldsFilters.includes(action.payload)) {
        newFilters.push(action.payload);
      }
      return {
        ...state,
        fieldsFilters: newFilters,
      };
    case QuestionRoasterActionTypes.REMOVE_FIELD_FILTER:
      const filtersAfterRemove = state.fieldsFilters.filter(
        (filter) => filter !== action.payload,
      );
      return { ...state, fieldsFilters: filtersAfterRemove };
    case QuestionRoasterActionTypes.RESET_FIELDS_FILTERS:
      return { ...state, fieldsFilters: [] };
    case QuestionRoasterActionTypes.ADD_LANGUAGE_FILTER:
      return { ...state, languageFilter: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useQuestionRoasterContext, QuestionRoasterProvider };
