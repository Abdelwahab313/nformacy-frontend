import React from 'react';
import styled from 'styled-components';
import { getRemainingHoursFromDate } from 'services/dateTimeParser';
import classNames from 'clsx';
import { dateTimePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';


const Circle = styled.div`
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.color};
  border-radius: 1em;
`;
const QuestionRemainingTimeAlarm = ({ remainingTime, totalActionHours, className, ...props}) => {
  const remainingHours = getRemainingHoursFromDate(remainingTime);
  const remainingHoursPercent = (remainingHours / totalActionHours) * 100;
  let color;
  if (remainingHoursPercent >= 50) {
    color = 'green';
  } else if (remainingHoursPercent < 50 && remainingHoursPercent >= 25) {
    color = 'yellow';
  } else if (remainingHoursPercent < 25 && remainingHoursPercent >= 10) {
    color = 'orange';
  } else if (remainingHoursPercent < 10 && remainingHoursPercent > 0) {
    color = 'red';
  } else {
    color = '';
  }

  const alarmClasses = classNames({
    [color]: true,
    [className]: true 
  });
  return <Circle className={alarmClasses} color={color} {...props}/>;
};

export default QuestionRemainingTimeAlarm;
