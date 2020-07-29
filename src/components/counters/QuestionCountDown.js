import React from 'react';
import Countdown from 'react-countdown';
import Typography from '@material-ui/core/Typography';
import AlarmIcon from '@material-ui/icons/Alarm';

const QuestionCountDown = ({ date, className, id }) => {
  function counterRender() {
    return ({
              total,
              days,
              hours,
              minutes,
              seconds,
              milliseconds,
              completed,
            }) => {
      return (
        <Typography
          style={{ display: 'flex', alignItems: 'center' }}
          id={id}
          className={className}>
          <AlarmIcon color={'primary'}/>
          {completed
            ? 'Closed'
            : `Question is Open till ${days} days and ${hours}:${minutes}:${seconds}`}
        </Typography>
      );
    };
  }

  return (
    <Countdown
      className={className}
      date={date}
      renderer={counterRender()}
    />
  );
};

export default QuestionCountDown;