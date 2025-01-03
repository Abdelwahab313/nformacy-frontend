import React from 'react';
import { useTranslation } from 'react-i18next';
import Countdown from 'react-countdown';
import Typography from '@material-ui/core/Typography';
import AlarmIcon from '@material-ui/icons/Alarm';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export const useStyles = makeStyles(() => ({
  countDownText: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '\'Orbitron\', sans-serif',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  alarmIcon: {
    marginRight: '10px',
  },
}));

const QuestionCountDown = ({
  date,
  className,
  id,
  showIcon = true,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  if (!date) {
    return '';
  }
  function counterRender() {
    return ({ days, hours, minutes, seconds, completed }) => {
      const remainingTimeFormatted = !!days
        ? `${days} days ${hours}:${minutes}`
        : `${hours}:${minutes}:${seconds}`;
      return (
        <Typography
          variant={'caption'}
          id={id}
          className={clsx(classes.countDownText, className)}
          {...props}>
          {!!showIcon && (
            <AlarmIcon
              fontSize={'large'}
              color={'primary'}
              className={classes.alarmIcon}
            />
          )}
          {completed ? t('closed') : remainingTimeFormatted}
        </Typography>
      );
    };
  }

  return (
    <Countdown className={className} date={date} renderer={counterRender()} />
  );
};

export default QuestionCountDown;
