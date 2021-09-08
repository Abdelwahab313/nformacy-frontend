import React, { useEffect, useRef, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import Card from 'components/card/Card.js';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddProjectForm from './AddProjectForm';
import { createOrUpdateProject, fetchProjectDetails } from 'apis/projectsAPI';
import { useSnackBar } from 'context/SnackBarContext';
import useLocationState from 'hooks/useLocationState';
import LoadingCircle from 'components/progress/LoadingCircle';
import { getProjectSettingsWizard } from 'services/navigation';

const AddProject = () => {
  const [project, setProject] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const richTextRef = useRef(null);
  const { showSuccessMessage, showErrorMessage } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const projectId = useLocationState((state) => state?.projectId);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      fetchProjectDetails(projectId)
        .then((response) => {
          setProject(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const validate = (project) => {
    if (!project.title) {
      showErrorMessage(t('requiredTitle'));
      return false;
    }
    if (!project.startDate) {
      showErrorMessage(t('requiredStartDate'));
      return false;
    }
    if (!project.endDate) {
      showErrorMessage(t('requiredEndDate'));
      return false;
    }
    if (project.projectManagerId === undefined) {
      showErrorMessage(t('requiredProjectManager'));
      return false;
    }
    return true;
  };

  const handleCreateProject = () => {
    // @TODO needs to handle validation for the project fields
    if (!!validate(project)) {
      createOrUpdateProject({ ...project })
        .then((response) => {
          const responseResult = response.data;
          showSuccessMessage(t('projectAdded'));
          history.push(getProjectSettingsWizard(responseResult.id));
        })
        .catch(() => {});
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item xs={12}>
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
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default AddProject;
