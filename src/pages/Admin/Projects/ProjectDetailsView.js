import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import CustomTypography from 'components/typography/Typography';

const ProjectDetailsView = ({ project }) => {
  const { t } = useTranslation();
  const classes = useStyles();

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
                <CustomTypography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('projectNumber')}
                </CustomTypography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography
                  variant={'body1'}
                  id='projectNumberValue'
                  gutterBottom>
                  {project?.id}
                </CustomTypography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <CustomTypography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('title')}
                </CustomTypography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography
                  variant={'body1'}
                  id='projectTitle'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {project?.title}
                </CustomTypography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <CustomTypography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('details')}
                </CustomTypography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography
                  variant={'body1'}
                  id='projectNumberValue'
                  gutterBottom>
                  {project?.details}
                </CustomTypography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <CustomTypography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('fields')}
                </CustomTypography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography
                  variant={'body1'}
                  id='projectFields'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  <ColoredFieldsChips fields={project?.fields} />
                </CustomTypography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <CustomTypography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('location')}
                </CustomTypography>
              </Grid>
              <Grid item xs={8}>
                <CustomTypography
                  variant={'body1'}
                  id='projectLocation'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {project?.countries?.map((country) => country.label)}
                </CustomTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default ProjectDetailsView;
