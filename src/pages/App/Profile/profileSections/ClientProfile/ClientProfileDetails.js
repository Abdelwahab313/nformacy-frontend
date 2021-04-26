import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../../../styles/formsStyles';
import ClientLinkedInURL from './ClientLinkedInURL';
import ClientPersonalInfo from './ClientPersonalInfo';
import ClientWorkStatus from './ClientWorkStatus';

const ClientProfileDetails = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={9} className={classes.sectionRowContainerStyles}>
        <ClientLinkedInURL />
        <ClientPersonalInfo />
        <ClientWorkStatus />
      </Grid>
    </Fragment >
  );
};

export default ClientProfileDetails;