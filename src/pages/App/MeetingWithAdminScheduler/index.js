import React, { useMemo } from 'react';
import useFetchData from 'hooks/useFetchData';
import { fetchConsultantManagers } from 'apis/adminsAPI';
import {
  fetchScheduledMeetings,
  scheduleMeetingWithConsultantManager,
} from 'apis/meetingsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import MeetingScheduler from 'components/calendarDialogs/MeetingTime/MeetingScheduler';
import PageContainer from 'components/grid/PageContainer';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Box, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useSnackBar } from 'context/SnackBarContext';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';
import { getUserName } from 'core/user';
import CustomTypography from 'components/typography/Typography';
import MeetingDetailsSection from '../ServiceRequests/details/subComponents/MeetingDetailsSection';

const MeetingWithAdminScheduler = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { showSuccessMessage } = useSnackBar();
  const {
    fetchedData: consultantManagers,
    isLoading: isLoadingConsultants,
  } = useFetchData(() => {
    return fetchConsultantManagers();
  });
  const {
    fetchedData: scheduledMeetings,
    isLoading: isLoadingScheduledMeetings,
  } = useFetchData(() => {
    return fetchScheduledMeetings();
  });

  const consultantManager = consultantManagers[0];

  const scheduledMeetingWithAdmin = useMemo(() =>
    scheduledMeetings?.find(
      (meeting) => meeting.clientId === consultantManager?.id,
    ),
  );

  if (isLoadingConsultants || isLoadingScheduledMeetings) {
    return <LoadingCircle />;
  }

  const onSubmitDate = (selectedTime) => {
    scheduleMeetingWithConsultantManager(
      selectedTime,
      consultantManager.id,
    ).then(() => {
      showSuccessMessage(
        `Meeting has been scheduled successfully with ${getUserName(
          consultantManager,
        )}`,
      );
      history.push(RoutesPaths.App.Dashboard);
    });
  };

  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('meetingWithConsultant')} />
      <Box m={4}>
        <CustomTypography variant={'h6'}>
          {t('meetingWithAdmin')}
        </CustomTypography>
      </Box>
      <Grid item md={10} className={clsx(classes.pageContainerMargin)}>
        {!!scheduledMeetingWithAdmin?.id ? (
          <MeetingDetailsSection meeting={scheduledMeetingWithAdmin} />
        ) : (
          <MeetingScheduler
            user={consultantManager}
            onSubmitDate={onSubmitDate}
          />
        )}
      </Grid>
    </PageContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  pageContainerMargin: {
    marginTop: theme.spacing(3),
  },
}));

export default MeetingWithAdminScheduler;
