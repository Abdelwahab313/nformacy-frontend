import React, { useRef, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddProjectForm from './AddProjectForm';
import { RoutesPaths } from 'constants/routesPath';
import { createOrUpdateProject } from 'apis/projectsAPI';

const AddProject = () => {
  const [project, setProject] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const richTextRef = useRef(null);

  const handleCreateProject = () => {
    // @TODO needs to handle validation for the project fields
    createOrUpdateProject({ ...project, projectManagerId: 1 })
      .then(() => {
        history.push(RoutesPaths.Admin.AddProjectSettings);
      })
      .catch(() => {});
  };

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
          project={project}
          richTextRef={richTextRef}
          setProject={setProject}
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