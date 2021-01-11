import React from 'react';
import styled from 'styled-components';
import { getTimeDiffInHoursFromNow } from 'services/dateTimeParser';
import classNames from 'clsx';

const Circle = styled.div`
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.color};
  border-radius: 1em;
`;

const MeetingAlarm = ({ meetingTime, className, ...props }) => {
  const remainingHours = getTimeDiffInHoursFromNow(meetingTime);

  let color;
  if (remainingHours >= 24) {
    color = 'green';
  } else if (remainingHours < 24 && remainingHours >= 12) {
    color = 'yellow';
  } else if (remainingHours < 12 && remainingHours >= 2) {
    color = 'orange';
  } else if (remainingHours < 2 && remainingHours > 0) {
    color = 'red';
  } else {
    color = '';
  }

  const alarmClasses = classNames({
    [color]: true,
    [className]: true,
  });
  return (
    <Circle className={alarmClasses} id='meeting' color={color} {...props} />
  );
};

export default MeetingAlarm;
