import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useStyles } from '../../styles/breadcrumbsStyles';
import useLocale from '../../hooks/localization/useLocale';
import DIRECTIONS from '../../constants/direction';

const BreadcrumbsCustomSeparator = ({ pageName }) => {
  const classes = useStyles();
  const { locale } = useLocale();

  return (
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
        <Link color='inherit' href='/'>
          <Typography
            className={classes.inactiveBreadcrumb}
            id={'home-breadcrumb'}>
            Home
          </Typography>
        </Link>
        <Typography color={'primary'} className={classes.activeBreadcrumb}>
          {pageName}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsCustomSeparator;
