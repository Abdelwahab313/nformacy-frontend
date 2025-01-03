import React, { Fragment, useState, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
import Link from '@material-ui/core/Link';
import t from '../../../../../locales/en/freelancerProfile.json';
import CorporateProfileDetailsForm from 'components/forms/CorporateProfileForms/CorporateProfileDetailsForm';

const CorporateLinkedInURL = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <CorporateProfileDetailsForm
              user={user}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Box elevation={3} className={classes.personalInfoSections}>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={3}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['website']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='website'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current?.linkedInProfileUrl && (
                <Link
                  id='website'
                  href={user.current.linkedInProfileUrl}>
                  {user.current.linkedInProfileUrl}
                </Link>
              )}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editBasicInfo'
              onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default CorporateLinkedInURL;