import React from 'react';
import { Container } from '@material-ui/core';
import { selectStyle } from '../../../styles/formsStyles';
import ReactSelectMaterialUi from 'react-select-material-ui';
import Typography from '@material-ui/core/Typography';

const calculateTimeSlotsOptions = (startTime, endTime) => {
  let timeSlots = [];
  let time = startTime;
  while (time < endTime) {
    const timeSlotOption = {
      label: time.format('LT'),
      value: time.toDate(),
    };
    timeSlots.push(timeSlotOption);
    time.add('30', 'minutes');
  }
  return timeSlots;
};

const MeetingTimePicker = ({
  startTime,
  endTime,
  handleTimeChange,
  selectedTime = '',
}) => {
  const timesRange = calculateTimeSlotsOptions(startTime, endTime);

  return (
    <Container>
      <Typography gutterBottom>Select Time from those Available List</Typography>
      <ReactSelectMaterialUi
        id={'available-time'}
        fullWidth={true}
        placeholder='Select available time'
        SelectProps={{
          styles: selectStyle,
        }}
        onChange={handleTimeChange}
        options={timesRange}
        value={selectedTime}
      />
    </Container>
  );
};

export default MeetingTimePicker;