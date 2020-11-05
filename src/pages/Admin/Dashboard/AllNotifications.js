import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useQuery } from 'react-query';
import { fetchAllNotifications } from '../../../apis/notifications';
import LoadingCircle from '../../../components/progress/LoadingCircle';
import NotificationCard from '../../../components/notificationCard/NotificationCard';


const AllNotifications = () => {
  const { isLoading, data } = useQuery(
    'allNotifications',
    fetchAllNotifications,
  );
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Grid container id='allNotifications'>
      {data?.notifications?.map((notification) => (
        <NotificationCard
          notification={notification}
          key={notification.notificationId}
        />
      ))}
    </Grid>
  );
};

export default AllNotifications;
