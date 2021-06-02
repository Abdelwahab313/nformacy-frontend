import React from 'react';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { RoutesPaths } from 'constants/routesPath';
import AccountsTable from 'pages/App/Accounts/list/AccountsTable';
import useFetchData from 'hooks/useFetchData';
import { fetchAccounts } from 'apis/accountsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { Grid } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import clsx from 'clsx';
import PageContainer from 'components/grid/PageContainer';
import authManager from 'services/authManager';

const CorporateAccountsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();

  const { fetchedData: accounts, isLoading } = useFetchData(() => {
    return fetchAccounts(currentUser.id);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('accountList')} />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        className={clsx(classes.addAdminBtn, classes.pageContainerMargin)}>
        <SubmitButton
          id={'addNewAccount'}
          onClick={() => history.push(RoutesPaths.App.AddAccount)}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addNewAccount')}
            </CustomTypography>
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <AccountsTable accounts={accounts} />
          </CardBody>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default CorporateAccountsList;
