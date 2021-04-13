import React, { useState } from 'react';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAccountForm from './AddAccountForm';
import { addAccount } from 'apis/accountsAPI';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/questionFormStyles';
import PageContainer from 'components/grid/PageContainer';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const AddAccount = () => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const navigatToAccountsList = () => {
    history.push(RoutesPaths.App.Accounts);
  };
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const validate = (user) => {
    if (!user.firstName) {
      showErrorMessage(t('requiredFirstName'));
      return false;
    }
    if (!user.lastName) {
      showErrorMessage(t('requiredLastName'));
      return false;
    }
    if (!user.email) {
      showErrorMessage(t('requiredEmail'));
      return false;
    }
    return true;
  };

  const handleCreateAccount = () => {
    if (!!validate(user)) {
      addAccount({
        ...user,
      })
        .then(() => {
          showSuccessMessage(t('accountAdded'));
          navigatToAccountsList();
        })
        .catch(({ response }) => {
          return response?.data?.errors.forEach((error) => {
            if (error.includes('Email')) {
              showErrorMessage(t('emailIsExist'));
            }
          });
        });
    }
  };
  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('addAccount')} />
      <Card className={classes.addAccountContainer}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>{t('addNewAccount')}</Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddAccountForm
          user={user}
          setUser={setUser}
          viewOnly
          primaryButton={{
            id: 'createAccountButton',
            onClick: () => {
              handleCreateAccount();
            },
            buttonText: 'Create Account',
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default AddAccount;
