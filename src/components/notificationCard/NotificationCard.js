import { useStyles } from '../../styles/notificationCard';
import useNotification from '../../hooks/notifications/useNotification';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuestionIcon from '../../assets/question.svg';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Notification from 'core/notifications/Notification';

export const Circle = (props) => {
  const classes = useStyles();

  return <div className={classes.circle} {...props} />;
};

const NotificationCard = ({ notification }) => {
  const classes = useStyles();
  const { visitNotification } = useNotification();
  const { t } = useTranslation();

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
          <img
            src={QuestionIcon}
            alt='Question'
            className={clsx(classes.avatar, {
              [classes.iconOverlay]: notification.readAt,
            })}
          />
          {Notification.getString(t, notification)}
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
