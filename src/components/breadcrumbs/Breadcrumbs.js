import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../styles/breadcrumbsStyles';
import useLocale from '../../hooks/localization/useLocale';
import DIRECTIONS from '../../constants/direction';
import Direction from 'components/grid/Direction';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from 'constants/routesPath';

const BreadcrumbsCustomSeparator = ({ pageName }) => {
  const classes = useStyles();
  const { locale } = useLocale();
  const { t } = useTranslation();

  return (
    <Direction>
      <Grid item xs={10}>
        <div className={classes.root}>
          <Breadcrumbs
            id={'question-roaster-breadcrumbs'}
            separator={
              DIRECTIONS[locale] === 'ltr' ? (
                <NavigateNextIcon color='primary' fontSize='small' />
              ) : (
                <NavigateBeforeIcon color='primary' fontSize='small' />
              )
            }
            aria-label='breadcrumb'>
            <Link color='inherit' href={RoutesPaths.App.Dashboard}>
              <Typography id={'home-breadcrumb'}>{t('common:home')}</Typography>
            </Link>
            <Typography color={'primary'}>{pageName}</Typography>
          </Breadcrumbs>
        </div>
      </Grid>
    </Direction>
  );
};

export default BreadcrumbsCustomSeparator;
