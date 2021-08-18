import React from 'react';
import GridItem from 'components/grid/GridItem';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import ProjectConsultantsTable from './ProjectConsultantsTable';
import { fetchProjectConsultants } from 'apis/projectsAPI';
import SubmitButton from 'components/buttons/SubmitButton';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import useLocationState from 'hooks/useLocationState';
import { getAddConsultantsToProjectPath } from 'services/navigation';

const ProjectConsultantsList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const projectId = useLocationState((state) => state?.projectId);

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchProjectConsultants(projectId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  const navigateToPostConsultant = () => {
    history.push(getAddConsultantsToProjectPath(projectId));
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <SubmitButton
          id='postConsultantButton'
          className={classes.postProjectButton}
          buttonText={t('addConsultants')}
          startIcon={<AddIcon />}
          onClick={navigateToPostConsultant}
        />
        <Card plain>
          <CardBody id='consultantsList'>
            <ProjectConsultantsTable consultants={consultants} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectConsultantsList;
