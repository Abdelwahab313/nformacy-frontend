import React, { Fragment, useState, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
import t from '../../../../../locales/en/freelancerProfile.json';
import {useTranslation} from 'react-i18next'
import CorporateProfilePersonalInfoForm from 'components/forms/CorporateProfileForms/CorporateProfilePersonalInfoForm';
import { companySizeOptions } from 'constants/dropDownOptions';
import { getCountriesOptions } from 'constants/countries';

const CorporatePersonalInfo = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  const countries = getCountriesOptions(isArlang);
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
            <CorporateProfilePersonalInfoForm
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
              {t['countryOfResidence']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='countryOfResidence'
              gutterBottom
              className={[classes.fieldValueStyles, classes.centeredText]}>
              {user.current.country &&
                countries?.find(
                  (country) => country.value === user.current.country,
                ).label}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['industry']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='industry'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current?.industriesOfExperience?.map((industry, key) => (
                <Typography
                  id='industry'
                  key={key}
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {industry.label}
                </Typography>
              ))}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['companySize']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='companySize'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.companySize &&
                companySizeOptions?.find(
                  (size) => size.value === user.current.companySize,
                ).label}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default CorporatePersonalInfo;