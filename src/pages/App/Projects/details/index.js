import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Direction from 'components/grid/Direction';
import ProjectDetailsView from 'pages/Admin/Projects/ProjectDetailsView';
import ProjectServicesList from 'pages/Admin/Projects/ProjectServicesList';

const ProjectDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Direction>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          <BreadcrumbsCustomSeparator pageName={t('serviceDetails')} />
          <ProjectDetailsView />
        </Grid>
        <Grid item xs={10} className={classes.servicesTableContainer}>
          <ProjectServicesList />
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
