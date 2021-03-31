import React, { useState, useRef, Fragment } from 'react';
import Link from '@material-ui/core/Link';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import { organizationalLevel, employmentStatus } from 'constants/dropDownOptions';
import { Box, Grid, Typography, Dialog, DialogContent, IconButton } from '@material-ui/core';
import { useStyles } from '../../../../styles/formsStyles';
import countryList from 'react-select-country-list';
import t from '../../../../locales/en/freelancerProfile.json';
import Transition from 'components/animations/Transition';
import EditIcon from '@material-ui/icons/Edit';
import ClientProfileDetailsForm from 'components/forms/ClientProfileDetailsForm';

const ClientProfileDetails = () => {
  const classes = useStyles();
  const [countries] = useState(countryList().getData());
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
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
            <ClientProfileDetailsForm
              user={user}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item xs={12} sm={9} className={classes.sectionRowContainerStyles}>
        <Box elevation={3} className={classes.personalInfoSections}>
          <Grid container className={classes.sectionRowStyles}>
            <Grid item xs={3}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['linkedInProfileUrl']}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id='linkedInProfileUrlValue'
                gutterBottom
                className={classes.fieldValueStyles}>
                {user.current?.linkedInProfileUrl && (
                  <Link
                    id='linkedInProfileUrlLink'
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

        <Box elevation={3} className={classes.personalInfoSections}>
          <Grid item xs={12} className={classes.personalInfoHeaderContainer}>
            <Typography className={classes.personalInfoHeader}>
              {t['personalInfo']}
            </Typography>
          </Grid>
          <Grid container className={classes.sectionRowStyles}>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['countryOfResidence']}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id='countryOfResidence'
                gutterBottom
                className={classes.fieldValueStyles}>
                {user.current.country &&
                  countries?.find(
                    (country) => country.value === user.current.country,
                  ).label}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.sectionRowStyles}>
            <Grid item xs={6}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['employmentStatus']}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                id='currentEmploymentStatus'
                gutterBottom
                className={classes.fieldValueStyles}>
                {
                  employmentStatus.find(
                    (status) =>
                      status.value === user.current.currentEmploymentStatus,
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
                {t['email']}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id='email'
                gutterBottom
                className={classes.fieldValueStyles}>
                {user.current.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box elevation={3} className={classes.personalInfoSections}>
          <Grid container className={classes.sectionRowStyles}>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['referenceNumber']}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id='referenceNumberValue'
                gutterBottom
                className={classes.fieldValueStyles}>
                {user.current.referenceNumber}
              </Typography>
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
                {t['fieldsOfSpecialization']}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id='fieldsOfSpecialization'
                gutterBottom
                className={classes.fieldValueStyles}>
                <ColoredFieldsChips fields={user?.current?.fields} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.sectionRowStyles}>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['language']}
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
        </Box>
      </Grid>
    </Fragment >
  );
};

export default ClientProfileDetails;