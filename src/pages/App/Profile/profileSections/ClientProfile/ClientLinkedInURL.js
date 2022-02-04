import React, { Fragment, useState, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import classNames from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
import ClientProfileDetailsForm from 'components/forms/ClientProfileForms/ClientProfileDetailsForm';
import Link from '@material-ui/core/Link';

const ClientLinkedInURL = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
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
            <ClientProfileDetailsForm user={user} closeDialog={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
      <Box elevation={3} className={classNames(classes.personalInfoSections, {
          [classes.personalInfoSectionsAr]: isArlang,
        })}>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={3}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t('linkedInProfile')}
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={6} className={classes.linkedLinkMobile}>
            <Typography
              id='linkedInProfileUrlValue'
              gutterBottom
              className={[classes.fieldValueStyles, classes.profileURLMobile]}>
              {user.current?.linkedInProfileUrl && (
                <Link
                  id='linkedInProfileUrlLink'
                  href={user.current.linkedInProfileUrl}>
                  {user.current.linkedInProfileUrl}
                </Link>
              )}
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
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

export default ClientLinkedInURL;
