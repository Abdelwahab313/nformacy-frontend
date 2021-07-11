import React from 'react';
import GridItem from 'components/grid/GridItem';

import CardBody from 'components/card/CardBody';
import GridContainer from 'components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import { useStyles } from 'styles/Admin/questionFormStyles';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import Card from 'components/card/Card';
import ProjectMangersTable from 'templates/projectManagers/ProjectMangersTable';
import { fetchProjectManagers } from 'apis/projectMangersAPI';

const ProjectManagersList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { fetchedData: projectManagers, isLoading } = useFetchData(() => {
    return fetchProjectManagers();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addProjectManagerBtn'}
          onClick={() => history.push(RoutesPaths.Admin.AddProjectManager)}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addProjectManagerBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ProjectMangersTable projectManagers={projectManagers} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ProjectManagersList;
