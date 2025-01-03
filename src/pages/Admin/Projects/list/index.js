import React from 'react';
import GridItem from 'components/grid/GridItem';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import ProjectsTable from 'templates/projects/ProjectsTable';
import { fetchProjects } from 'apis/projectsAPI';
import SubmitButton from 'components/buttons/SubmitButton';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useHistory } from 'react-router';
import { getEditProjectPath } from 'services/navigation';
import ProjectGuardian from 'core/guardians/ProjectGuardian';

const ProjectsList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { fetchedData: projects, isLoading } = useFetchData(() => {
    return fetchProjects();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  const navigateToPostProject = () => {
    history.push(getEditProjectPath());
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        {ProjectGuardian.canAddProject() && (
          <SubmitButton
            id='postProjectButton'
            className={classes.postProjectButton}
            buttonText={t('createNewProject')}
            startIcon={<AddIcon />}
            onClick={navigateToPostProject}
          />
        )}
        <Card plain>
          <CardBody id='projectsList'>
            <ProjectsTable projects={projects} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectsList;
