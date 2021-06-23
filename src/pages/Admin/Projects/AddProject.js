import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddProjectForm from './AddProjectForm';
import { RoutesPaths } from 'constants/routesPath';

const AddProject = () => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const { t } = useTranslation();

  const handleCreateProject = () => {
    history.push(RoutesPaths.Admin.Projects);
  };

  // const handleCreateProject = () => {
  //   addProject()
  //     .then(() => {
  //       navigateToProjectsList();
  //     })
  //     .catch(({}) => {});
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>{t('addNewProject')}</Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddProjectForm
          user={user}
          setUser={setUser}
          viewOnly
          primaryButton={{
            id: 'createAdviserButton',
            onClick: () => {
              handleCreateProject();
            },
            buttonText: 'Next Step',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};
export default AddProject;
