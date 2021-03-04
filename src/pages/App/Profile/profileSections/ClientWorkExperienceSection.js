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
import React, { useRef, useState } from 'react';
import Transition from '../../../../components/animations/Transition';
import clsx from 'clsx';
import ClientWorkExperienceForm from 'components/forms/ClientWorkExperienceForm.js';
import { organizationalLevel } from 'constants/dropDownOptions';

const ClientWorkExperienceSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item id='workExperience'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'workExperienceDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <ClientWorkExperienceForm user={user} closeDialog={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid container alignItems='center'>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
            <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
              <Typography gutterBottom className={classes.sectionHeaderStyles}>
                {t['workExperienceHeader']}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
              <IconButton aria-label='edit' onClick={handleClickOpen}>
                <EditIcon color={'primary'} />
              </IconButton>
            </Grid>
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
                  {t['organizationalLevel']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='industriesOfExperience'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {organizationalLevel.find((level) => level.value === user.current.organizationLevel)?.label}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['jobTitle']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='jobTitle'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.jobTitle}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['company']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='company'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.organizationName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ClientWorkExperienceSection;
