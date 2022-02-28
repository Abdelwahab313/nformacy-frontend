import React from 'react';
import classNames from 'clsx';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { useQuery } from 'react-query';
import { fetchAllNotifications } from '../../../apis/notifications';
import LoadingCircle from '../../../components/progress/LoadingCircle';
import NotificationCard from '../../../components/notificationCard/NotificationCard';
import authManager from 'services/authManager';
import { NotificationsProvider } from 'hooks/notifications/context';
import { makeStyles } from '@material-ui/styles';

const AllNotifications = () => {
  const classes = useStyles();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const { isLoading, data } = useQuery(
    'allNotifications',
    fetchAllNotifications,
  );
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Grid
      container
      id='allNotifications'
      className={classNames(classes.allNotifications, {
        [classes.allNotificationsAr]: isArlang,
      })}>
      {data?.notifications?.map((notification) => (
        <NotificationCard
          notification={notification}
          key={notification.notificationId}
        />
      ))}
    </Grid>
  );
};

const WithNotification = (props) => {
  const user = authManager.retrieveCurrentUser();
  return (
    <NotificationsProvider
      initialNotifications={user?.notifications}
      unreadCount={user?.unseenNotificationsCount}>
      <AllNotifications {...props} />
    </NotificationsProvider>
  );
};

const useStyles = makeStyles({
  allNotifications: {
    margin: 50,
  },
  allNotificationsAr: {
    direction: 'ltr',
  },
});
export default WithNotification;
