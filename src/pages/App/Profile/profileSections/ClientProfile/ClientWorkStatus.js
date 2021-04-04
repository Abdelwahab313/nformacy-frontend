import React, { Fragment, useState, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
import t from '../../../../../locales/en/freelancerProfile.json';
import { organizationalLevel } from 'constants/dropDownOptions';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import ClientProfileWorkStatusForm from 'components/forms/ClientProfileWorkStatusForm';
import FieldsView from '../FieldsView';
import useUserFieldsFetcher from 'hooks/useUserFieldsFetcher';
import useFieldsFetcher from 'hooks/useFieldsFetcher';

const ClientWorkStatus = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { fields, loading: fieldsLoading } = useFieldsFetcher();
  const {
    currentUserFields,
    loading: userFieldsLoading,
  } = useUserFieldsFetcher();

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
            <ClientProfileWorkStatusForm
              user={user}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Box elevation={3} className={classes.personalInfoSections}>
        <Grid container>
          <Grid item xs={11}></Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editBasicInfo'
              onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['jobTitle']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='jobTitle'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.jobTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['organizationalLevel']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='organizationalLevel'
              gutterBottom
              className={classes.fieldValueStyles}>
              {
                organizationalLevel.find(
                  (status) =>
                    status.value === user.current.organizationLevel,
                )?.label
              }
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['organizationName']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='organizationName'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.organizationName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['languages']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='language'
              gutterBottom
              className={classes.fieldValueStyles}>
              <ColoredFieldsChips fields={user.current.language} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['fieldsOfSpecialization']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FieldsView
              currentUserFields={currentUserFields}
              fields={fields}
              loading={userFieldsLoading || fieldsLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ClientWorkStatus;