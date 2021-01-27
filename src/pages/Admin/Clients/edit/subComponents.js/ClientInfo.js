import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchClients } from 'apis/clientsAPI';
import useFetchData from 'hooks/useFetchData';

const ClientInfo = () => {
  // const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const { fetchedData: clients, isLoading } = useFetchData(() => {
    return fetchClients();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Grid item id='basicInfo'>
      {/* <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <ClientForm
              user={user}
              closeDialog={handleClose}
              // setProfilePic={setProfilePic}
            />
          </Grid>
        </DialogContent>
      </Dialog> */}
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t('basicInformation')}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editBasicInfo'
              onClick={() => { }}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle'
        // style={dividerStyle} 
        />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          {/* <Grid item xs={12} sm={3} className={classes.profilePhotoContainer}>
            <img
              id='profilePicture'
              src={profilePic}
              className={classes.largeProfilePic}
              alt='Profile Picture'
            />
          </Grid> */}
          <Grid
            item
            xs={12}
            sm={9}
            className={classes.sectionRowContainerStyles}>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('firstName')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='firstNameValue'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {clients[0].firstName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('lastName')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='lastName'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {clients[0].lastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('shortName')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='shortNameValue'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {clients[0].firstName ? clients[0].firstName.split('')[0] + ' ' + clients[0].lastName : ''}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('referenceNumber')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='referenceNumberValue'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {clients[0].referenceNumber}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t('email')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id='email'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {clients[0].email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default ClientInfo;
