import React, { useMemo } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import LoadingCircle from 'components/progress/LoadingCircle';
import CustomTypography from 'components/typography/Typography';
import PageContainer from 'components/grid/PageContainer';
import { fetchClientServices } from 'apis/servicesAPI';
import useFetchData from 'hooks/useFetchData';
import { useLocation } from 'react-router';
import { fetchClientsDetails } from 'apis/clientsAPI';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import DeactivateAccountButton from './DeactivateAccountButton';
import ReactivateAccountButton from './ReactivateAccountButton';
import clsx from 'clsx';
import ServicesStyledTable from 'templates/services/ServicesStyledTable';

const CorporateAccountDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const accountId = location?.state?.accountId;

  const { fetchedData: services, isLoading } = useFetchData(() =>
    fetchClientServices(accountId),
  );
  const servicesRows = parseServicesToTableRows(services, t);

  const { fetchedData: account } = useFetchData(() => {
    return fetchClientsDetails(accountId);
  });

  const isDeactivatedUser = useMemo(() => {
    return !!account?.deactivatedAt;
  }, [account]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('accountDetails')} />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        className={classes.accountDetailsWrapper}>
        <Grid
          container
          direction={'row'}
          justify='space-between'
          alignItems={'center'}
          className={clsx(classes.marginBottom)}>
          <Grid item>
            <CustomTypography variant='h5' fontWeight='bold'>
              {account.firstName + ' ' + account.lastName}
            </CustomTypography>
          </Grid>
          <Grid item>
            {!!isDeactivatedUser ? (
              <ReactivateAccountButton accountId={accountId} />
            ) : (
              <DeactivateAccountButton accountId={accountId} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <ServicesStyledTable services={servicesRows} isMultiUser={true} />
    </PageContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  accountDetailsWrapper: {
    margin: [theme.spacing(2), theme.spacing(1)],
  },
}));

export default CorporateAccountDetails;
