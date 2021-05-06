import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import t from '../../../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../../../styles/formsStyles';
import React, { useRef } from 'react';
import Transition from '../../../../components/animations/Transition';
import ProjectForm from 'components/forms/ProjectForm.js';
import useFieldsFetcher from 'hooks/useFieldsFetcher';
import useUserFieldsFetcher from 'hooks/useUserFieldsFetcher.js';
import { flatMap } from 'lodash';
import clsx from 'clsx';
import FieldsView from './FieldsView.js';

const ProjectSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const { fields, loading: fieldsLoading } = useFieldsFetcher();
  const {
    currentUserFields,
    updateUserFields,
    loading: userFieldsLoading,
  } = useUserFieldsFetcher();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item id='fieldsOfSpecialization'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <ProjectForm
              user={user}
              fields={flatMap(currentUserFields)}
              updateFields={() => updateUserFields()}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['majorAchievedProjects']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editFieldsOfSpecializations'
              onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <Grid
            item
            xs={12}
            className={clsx([
              classes.sectionContainerPaddingLeft,
              classes.sectionRowContainerStyles,
            ])}>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['title']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current.projects.map((proj, key) => (
                  <Typography
                    id='title'
                    key={key}
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {proj.title}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['experiencedIn']}
                </Typography>
              </Grid>
              <FieldsView
                currentUserFields={currentUserFields}
                fields={fields}
                loading={userFieldsLoading || fieldsLoading}
              />
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['jobRole']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current.projects.map((proj, key) => (
                  <Typography
                    id='jobRole'
                    key={key}
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {proj.jobRole}
                  </Typography>
                ))}
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ProjectSection;
