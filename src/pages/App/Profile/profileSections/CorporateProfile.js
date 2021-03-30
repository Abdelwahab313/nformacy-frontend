import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../../../styles/formsStyles';
import React, { useRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BasicInfoForm from '../../../../components/forms/BasicInfoForm';
import Transition from '../../../../components/animations/Transition';
import t from '../../../../locales/en/freelancerProfile.json';
import Link from '@material-ui/core/Link';
import ColoredFieldsChips from 'components/chips/ColoredFieldsChips';
import countryList from 'react-select-country-list';
import { Box } from '@material-ui/core';

const CorporateBasicInfoSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const [countries] = useState(countryList().getData());
  const [profilePic, setProfilePic] = React.useState(
    user.current.avatar || require('../../../../assets/emptyavatar.jpg'),
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Grid item id='basicInfo'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <BasicInfoForm
              user={user}
              closeDialog={handleClose}
              setProfilePic={setProfilePic}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={[classes.sectionHeaderStyles, classes.personalInfoHeader]} >
              {t['basicInformation']}
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
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>

          <Grid item xs={12} sm={3} className={[classes.profilePhotoContainer, classes.profileAndNameContainer]}>
            <img
              id='profilePicture'
              src={profilePic}
              className={classes.largeProfilePic}
              alt='Profile'
            />
            <Typography
              id='company'
              gutterBottom>
              {user.current.organizationName}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={9}
            className={classes.sectionRowContainerStyles}>
            <Box elevation={3} className={classes.personalInfoSections}>
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={4}>
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
              </Grid>
            </Box>
            <Box elevation={3} className={classes.personalInfoSections}>
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
                    {t['numOfEmployees']}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id='numOfEmployees'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {'3'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box elevation={3} className={classes.personalInfoSections}>
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={10} className={classes.personalInfoHeaderContainer}>
                  <Typography gutterBottom className={classes.personalInfoHeader} >
                    {t['contactPersonInfo']}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['firstName']}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id='firstName'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {user.current.firstName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={4}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['lastName']}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id='lastName'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {user.current.lastName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={4}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['title']}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id='title'
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
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={4}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['phoneNumber']}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id='phoneNumber'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    <ColoredFieldsChips fields={user?.current?.fields} />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default CorporateBasicInfoSection;
