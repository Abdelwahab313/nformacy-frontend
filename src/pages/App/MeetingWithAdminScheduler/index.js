import React from 'react';
import useFetchData from 'hooks/useFetchData';
import { fetchConsultantManagers } from 'apis/adminsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import MeetingScheduler from 'components/calendarDialogs/MeetingTime/MeetingScheduler';
import PageContainer from 'components/grid/PageContainer';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const MeetingWithAdminScheduler = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { fetchedData: consultantManagers, isLoading } = useFetchData(() => {
    return fetchConsultantManagers();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('meetingWithConsultant')} />
      <Grid item md={10} className={clsx(classes.pageContainerMargin)}>
        <MeetingScheduler
          user={consultantManagers[0]}
          onSubmitDate={() => {}}
        />
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
