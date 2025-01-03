import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../../../../styles/formsStyles';
import ClientProfilePicture from './ClientProfilePicture';
import ClientProfileDetails from './ClientProfileDetails';

const ClientProfileContainer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid item id='basicInfo'>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={12} className={classes.paperSectionHeaderStyles}>
            <Typography
              gutterBottom
              className={[
                classes.sectionHeaderStyles,
                classes.personalInfoHeader,
              ]}>
              {t('basicInformation')}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <ClientProfilePicture />
          <ClientProfileDetails />
        </Grid>
      </Paper>
    </Grid>
  );
};
export default ClientProfileContainer;
