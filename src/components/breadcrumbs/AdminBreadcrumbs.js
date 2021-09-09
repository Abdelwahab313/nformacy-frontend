import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Grid } from '@material-ui/core';
import { useStyles } from 'styles/breadcrumbsStyles';
import useLocale from 'hooks/localization/useLocale';
import DIRECTIONS from 'constants/direction';
import Direction from 'components/grid/Direction';

const AdminBreadcrumbsCustomSeparator = ({ breadCrumbsRoutes }) => {
  const classes = useStyles();
  const { locale } = useLocale();

  const renderPageRoutes = () => {
    return breadCrumbsRoutes.map((route) => (
      <Link color='inherit' href={route?.path}>
        <Typography color={'primary'}>{route?.name}</Typography>
      </Link>
    ));
  };

  return (
    <Direction>
      <Grid item xs={10}>
        <div className={classes.root}>
          <Breadcrumbs
            id={'admin-breadcrumbs'}
            separator={
              DIRECTIONS[locale] === 'ltr' ? (
                <NavigateNextIcon color='primary' fontSize='small' />
              ) : (
                <NavigateBeforeIcon color='primary' fontSize='small' />
              )
            }
            aria-label='breadcrumb'>

            {renderPageRoutes()}

          </Breadcrumbs>
        </div>
      </Grid>
    </Direction>
  );
};

export default AdminBreadcrumbsCustomSeparator;
