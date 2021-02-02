import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddAdvisorForm from './AddAdvisorForm';
import { getAdvisorsList } from 'services/navigation';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { addAdvisor } from 'apis/advisorAPI';
import { useSnackBar } from 'context/SnackBarContext';

const AddAdvisor = () => {

  const [user, setUser] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const navigatToAdvisersList = () => {
    history.push(getAdvisorsList());
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
    if (!user.password) {
      showErrorMessage(t('requiredPassword'));
      return false;
    }
    if (!user.confirmPassword) {
      showErrorMessage(t('requiredConfirmPassword'));
      return false;
    }
    return true;
  };

  const handleCreateAdviser = () => {
    if (!!validate(user)) {
      addAdvisor({
        ...user,
      }).then(() => {
        showSuccessMessage(t('adviserAdded'));
        navigatToAdvisersList();
      });
    };
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>
                {t('addNewAdvisor')}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddAdvisorForm
          user={user}
          setUser={setUser}
          viewOnly
          primaryButton={{
            id: 'createAdviserButton',
            onClick: () => {
              handleCreateAdviser();
            },
            buttonText: 'Create Advisor',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default AddAdvisor;
