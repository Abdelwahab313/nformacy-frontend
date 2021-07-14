import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import { fetchProjectDetails } from 'apis/projectsAPI';
import { fetchServices } from 'apis/servicesAPI';
import useFetchData from 'hooks/useFetchData';
import ProjectDetailsView from 'pages/Admin/Projects/ProjectDetailsView';
import LoadingCircle from 'components/progress/LoadingCircle';
import ServicesTable from 'templates/services/ServicesTable';

const ProjectDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { fetchedData: services, isLoading } = useFetchData(fetchServices);
  const { fetchedData: projects } = useFetchData(() => {
    return fetchProjectDetails();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('serviceDetails')} />
          <ProjectDetailsView project={projects[0]} />
        </Grid>
        <Grid item xs={10} className={classes.servicesTableContainer}>
          {/* TODO use another table for consulant/client activities */}
          <ServicesTable services={services} />
        </Grid>
      </Grid>
    </Direction>
  );
};

const useStyles = makeStyles((theme) => ({
  servicesTableContainer: {
    marginTop: theme.spacing(8),
  },
}));

export default ProjectDetails;
