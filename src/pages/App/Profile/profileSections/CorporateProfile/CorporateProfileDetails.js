import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../../../styles/formsStyles';
import CorporateLinkedInURL from './CorporateLinkedInURL';
import CorporatePersonalInfo from './CorporatePersonalInfo';
import CorporateContactPersonalInfo from './CorporateContactPersonalInfo';

const CorporateProfileDetails = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={12} sm={9} className={classes.sectionRowContainerStyles}>
        <CorporateLinkedInURL />
        <CorporatePersonalInfo />
        <CorporateContactPersonalInfo />
      </Grid>
    </Fragment >
  );
};

export default CorporateProfileDetails;