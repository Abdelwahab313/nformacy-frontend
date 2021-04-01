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

const CorporateAccountsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { fetchedData: accounts, isLoading } = useFetchData(() => {
    return fetchAccounts();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Grid container alignItems={'flex-start'} justify={'center'}>
      <Grid item xs={10} sm={10} className={classes.pageContainerMargin}>
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
      </Grid>
    </Grid>
  );
};

export default CorporateAccountsList;
