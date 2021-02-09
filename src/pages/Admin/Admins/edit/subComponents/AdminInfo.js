import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import authManager from 'services/authManager';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';

const AdminInfo = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();

  return (
    <Grid item id='basicInfo'>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t('basicInformation')}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton aria-label='edit' id='editBasicInfo' onClick={() => {}}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <Grid
            item
            xs={12}
            sm={9}
            className={classes.sectionRowContainerStyles}>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('firstName')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='firstNameValue'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {currentUser.firstName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('lastName')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='lastName'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {currentUser.lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('email')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='email'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {currentUser.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('fields')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='fields'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  <ColoredFieldsChips fields={currentUser.fields} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default AdminInfo;
