import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useStyles } from '../../styles/breadcrumbsStyles';


const BreadcrumbsCustomSeparator = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs
        id={'question-roaster-breadcrumbs'}
        separator={<NavigateNextIcon fontSize="small"/>}
        aria-label="breadcrumb">
        <Link color="inherit" href="/">
          <Typography className={classes.inactiveBreadcrumb} id={'home-breadcrumb'}>
            Home
          </Typography>
        </Link>
        <Typography color={'primary'} className={classes.activeBreadcrumb}>Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsCustomSeparator;