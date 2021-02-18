import React from 'react';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import CustomTypography from 'components/typography/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <img
        src={require('../../../assets/desktop_nformacy_logo.svg')}
        className={classes.nformacyLogo}
      />
      <Grid
        container
        justify={'center'}
        direction={'column'}>
        <CustomTypography variant={'h6'} fontWeight={'bold'}>
          Welcome to nformacy Admin Dashboard
        </CustomTypography>

        <CustomTypography variant={'subtitle1'}>
          Select one panel from the left side
        </CustomTypography>
      </Grid>
    </div>
  );
}
