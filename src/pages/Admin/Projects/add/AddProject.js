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
import Validator from 'services/validator';

const AddProject = () => {
  const [project, setProject] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const richTextRef = useRef(null);
  const { showSuccessMessage } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const projectId = useLocationState((state) => state?.projectId);

  // const isNewForm
  useEffect(() => {
    if (!!projectId) {
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
    const validatedErrors = {};

    const validStartDateMessage = Validator.validateStartDate(
      project?.startDate,
    );
    const validEndDateMessage = Validator.validateEndDate(
      project?.startDate,
      project?.endDate,
    );

    if (!project.title) {
      validatedErrors['title'] = t('requiredTitle');
    }
    if (!!validStartDateMessage) {
      validatedErrors['startDate'] = t(validStartDateMessage);
    }
    if (!!validEndDateMessage) {
      validatedErrors['endDate'] = t(validEndDateMessage);
    }
    if (project.projectManagerId === undefined) {
      validatedErrors['projectManagerId'] = t('requiredProjectManager');
    }

    if (Object.keys(validatedErrors).length > 0) {
      setErrors({ ...validatedErrors });
      return false;
    } else {
      return true;
    }
  };

  const handleCreateProject = async () => {
    // @TODO: needs to handle validation for the project fields
    if (!!validate(project)) {
      return createOrUpdateProject({ ...project }).then((response) => {
        const responseResult = response.data;
        showSuccessMessage(t('projectAdded'));
        history.push(getProjectSettingsWizard(responseResult.id));
      });
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
            errors={errors}
            viewOnly
            primaryButton={{
              id: 'createAdviserButton',
              onClick: handleCreateProject,
              buttonText: 'Next Step',
            }}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default AddProject;
