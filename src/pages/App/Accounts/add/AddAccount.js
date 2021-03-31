import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAccountForm from './AddAccountForm';
import { addAccount } from 'apis/accountsAPI';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { RoutesPaths } from 'constants/routesPath';
import { useStyles } from 'styles/Admin/questionFormStyles';

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
      }).then(() => {
        showSuccessMessage(t('accountAdded'));
        navigatToAccountsList();
      })
        .catch(({ response }) => {
          response.data.errors.forEach((error) => {
            if (error.includes('Email')) {
              showErrorMessage(t('emailIsExist'));
            }
          });
        });
    };
  };
  return (
    <GridContainer className={classes.addAccountContainer}>
      <GridItem xs={12} sm={12} md={12}>
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
      </GridItem>
    </GridContainer>
  );
};

export default AddAccount;
