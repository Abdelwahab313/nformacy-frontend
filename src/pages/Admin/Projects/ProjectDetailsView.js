import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import CustomTypography from 'components/typography/Typography';
import createMarkup from 'services/markup';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchProjectDetails } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import useLocationState from 'hooks/useLocationState';
import EditIcon from '@material-ui/icons/Edit';
import { Box, IconButton } from '@material-ui/core';
import { getEditProjectPath, history } from 'services/navigation';
import { renderCountries } from 'core/countries';

const ProjectDetailsView = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const projectId = useLocationState((state) => state?.projectId);
  const { fetchedData: project, isLoading } = useFetchData(() => {
    return fetchProjectDetails(projectId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }
  const handleClickEditButton = () => {
    history.push(getEditProjectPath(projectId));
  };

  return (
    <Grid item id='basicInfo'>
      <CustomTypography variant='h6'>{project.title}</CustomTypography>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={12} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t('projectDetails')}
            </Typography>
            <Box marginLeft={'auto'}>
              <IconButton
                aria-label='edit'
                id='editProjectInfo'
                onClick={handleClickEditButton}>
                <EditIcon color={'primary'} />
              </IconButton>
            </Box>
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
                <CustomTypography variant={'body1'} id='projectId' gutterBottom>
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
            <Grid
              container
              className={[classes.sectionRowStyles, classes.detailsContainer]}>
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
                  id='projectDetails'
                  gutterBottom>
                  <div
                    className={classes.detailsText}
                    dangerouslySetInnerHTML={createMarkup(project?.details)}
                  />
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
                  component={'div'}
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
                  {renderCountries(project.countries)}
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
