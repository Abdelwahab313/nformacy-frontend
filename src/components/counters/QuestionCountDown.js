import React from 'react';
import Countdown from 'react-countdown';
import Typography from '@material-ui/core/Typography';
import AlarmIcon from '@material-ui/icons/Alarm';

const QuestionCountDown = ({ date, className, id, showIcon=true, ...props}) => {
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
              const remainingTimeFormatted = !!days ? `${days} days ${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`
      return (
        <Typography
          style={{ display: 'flex', alignItems: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 'bold' }}
          id={id}
          className={className}
          {...props}>
          {!!showIcon && (<AlarmIcon fontSize={'large'} color={'primary'} style={{marginRight: '10px'}}/>)}
          {completed
            ? 'Closed'
            : remainingTimeFormatted}
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