import React, { createContext, useContext, useReducer } from 'react';
import { UPDATE_SELECTED_DAY } from './contextActions';

const CalendarContext = createContext();
const defaultValues = {
  selectedDay: '',
  availableDates: ['2020-06-28', '2020-06-29', '2020-06-30'],
};

const CalendarProvider = ({ children, initialValue }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = CalendarContext;
  return (
    <Provider value={useReducer(calendarReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useCalendarState = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('UseCalendarState must be used within a CalendarProvider');
  }
  return context;
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_DAY:
      return { ...state, selectedDay: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useCalendarState, CalendarProvider };
