import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddProjectManagerForm from './AddProjectManagerForm';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { addAdvisor } from 'apis/advisorAPI';
import { useSnackBar } from 'context/SnackBarContext';

const AddProjectManger = () => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const navigateAfterCreate = () => {
    history.goBack();
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

  const handleCreateProjectManager = () => {
    if (!!validate(user)) {
      addAdvisor({
        ...user,
      })
        .then(() => {
          showSuccessMessage(t('projectManagerAdded'));
          navigateAfterCreate();
        })
        .catch(({ response }) => {
          response.data.errors.forEach((error) => {
            if (error.includes('Email')) {
              showErrorMessage(t('emailIsExist'));
            }
          });
        });
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>
                {t('addNewProjectManager')}
              </Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddProjectManagerForm
          user={user}
          setUser={setUser}
          viewOnly
          primaryButton={{
            id: 'createProjectManagerButton',
            onClick: () => {
              handleCreateProjectManager();
            },
            buttonText: 'Create Project Manager',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default AddProjectManger;
