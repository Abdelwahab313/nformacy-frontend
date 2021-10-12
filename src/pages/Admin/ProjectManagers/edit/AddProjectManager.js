import React, { useEffect, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import AddProjectManagerForm from './AddProjectManagerForm';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { createOrUpdateProjectManager } from 'apis/projectMangersAPI';
import LoadingCircle from 'components/progress/LoadingCircle';
import { getUser } from 'apis/userAPI';
import { useLocation } from 'react-router';
import { useStyles } from 'styles/Admin/questionFormStyles';

const AddProjectManger = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const projectManagerId = location?.state?.projectManagerId;

  const [user, setUser] = useState({ id: projectManagerId });
  const [isLoading, setIsLoading] = useState(false);

  const navigateAfterCreate = () => {
    history.goBack();
  };
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  useEffect(() => {
    setIsLoading(true);
    getUser(projectManagerId)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  const handleCreateProjectManager = async () => {
    if (!!validate(user)) {
      return createOrUpdateProjectManager({
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

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader className={classes.projectManagerHeader} color='primary'>
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
            onClick: handleCreateProjectManager,
            buttonText: 'Create Project Manager',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default AddProjectManger;
