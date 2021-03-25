import React from 'react';

import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import CalenderCommandButtons from './CalendarCommandButtons';
import moment from 'moment';

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'titleTextEditor',
    'multilineTextEditor',
    'numberEditor',
  ];
  if (excludeFields.includes(props.type)) {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const DateEditor = (props) => {
  return (
    <TextField
      id='end-time-range-picker'
      type='time'
      value={moment(props?.value).format('HH:mm')}
      InputLabelProps={{ shrink: true }}
      inputProps={{ step: 900 }}
      onChange={(e) => {
        props.onValueChange(moment(e.target.value, 'HH:mm'));
      }}
    />
  );
};

const BooleanEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = ['All Day', 'Repeat'];
  if (excludeFields.includes(props.label)) {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};

const ResourceEditor = () => {
  return null;
};

const LabelEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'Title',
    'More Information',
    'Event Type',
    'Owners',
    'Repeat',
    'End Repeat',
  ];
  if (excludeFields.includes(props.text)) {
    return null;
  }
  return <AppointmentForm.Label {...props} />;
};

const CustomAppointmentForm = () => {
  return (
    <AppointmentForm
      commandButtonComponent={CalenderCommandButtons}
      textEditorComponent={TextEditor}
      dateEditorComponent={DateEditor}
      booleanEditorComponent={BooleanEditor}
      resourceEditorComponent={ResourceEditor}
      labelComponent={LabelEditor}
    />
  );
};

export default CustomAppointmentForm;
