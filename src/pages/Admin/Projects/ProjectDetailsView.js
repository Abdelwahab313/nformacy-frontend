import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import { getUserCountryLabel } from 'core/user';
import CustomTypography from 'components/typography/Typography';

const ProjectDetailsView = ({ project }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const country = getUserCountryLabel(project.location);
  return (
    <Grid item id='basicInfo'>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={12} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t('projectDetails')}
            </Typography>
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
                  {t('projectNumber')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography id='projectNumberValue' gutterBottom>
                  {project.projectNumber}
                </CustomTypography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('title')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='projectTitle'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {project.title}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('details')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography id='projectNumberValue' gutterBottom variant={'h6'}>
                  {project.details}
                </CustomTypography>
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
                  id='projectFields'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  <ColoredFieldsChips fields={project.fields} />
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('location')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='projectLocation'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {country}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default ProjectDetailsView;
