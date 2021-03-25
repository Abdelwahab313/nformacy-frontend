import React from 'react';
import { Container } from '@material-ui/core';
import moment from 'moment';
import ReactSelectMaterialUi from 'react-select-material-ui';
import Typography from '@material-ui/core/Typography';
import { selectStyle } from 'styles/formsStyles';

const calculateTimeSlotsOptions = (selectedDayTimeSlots) => {
  let timeOptions = [];
  selectedDayTimeSlots.forEach((timeSlot) => {
    let startTime = moment(timeSlot.startDate);
    let endTime = moment(timeSlot.endDate);

    while (startTime < endTime) {
      const timeSlotOption = {
        label: startTime.format('LT'),
        value: startTime.toDate(),
      };
      timeOptions.push(timeSlotOption);
      startTime.add('1', 'hours');
    }
  });

  return timeOptions;
};

const MeetingTimePicker = ({
  selectedDayTimeSlots,
  handleTimeChange,
  selectedTime = '',
}) => {
  const timesRange = calculateTimeSlotsOptions(selectedDayTimeSlots);

  return (
    <Container>
      <Typography gutterBottom>
        Select Time from those Available List
      </Typography>
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
