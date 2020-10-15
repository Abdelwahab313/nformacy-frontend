import { useStyles } from '../../styles/notificationCard';
import useNotification from '../../hooks/notifications/useNotification';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuestionIcon from '../../assets/Question.svg';
import moment from 'moment';
import React from 'react';
import { t } from '../../locales/en/notifications';

export const Circle = (props) => {
  const classes = useStyles();

  return <div className={classes.circle} {...props} />;
};

const NotificationCard = ({ notification }) => {
  const classes = useStyles();
  const { visitNotification } = useNotification();

  return (
    <ButtonBase
      className={clsx(classes.notificationCard, {
        [classes.greyOverlay]: !Boolean(notification.readAt),
      })}
      onClick={() => visitNotification(notification)}>
      <Grid>
        <Typography
          className={classes.notificationTextStyle}
          display='inline'
          gutterBottom>
          <img src={QuestionIcon} alt='Question' className={classes.avatar} />
          {t([notification.messageKey], notification.messageParameters)}
        </Typography>
      </Grid>
      <Grid container direction='row' justify='space-between'>
        <Typography
          className={clsx(classes.notificationTime, {
            [classes.unread]: !Boolean(notification.readAt),
            [classes.read]: Boolean(notification.readAt),
          })}
          variant='caption'
          gutterBottom>
          {moment(notification.createdAt).fromNow()}
        </Typography>
        {!Boolean(notification.readAt) && <Circle />}
      </Grid>
    </ButtonBase>
  );
};

export default NotificationCard;
