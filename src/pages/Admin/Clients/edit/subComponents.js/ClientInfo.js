import React, { useState, Fragment, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchClientsDetails } from 'apis/clientsAPI';
import { useLocation } from 'react-router';
import BeneficiaryProfileDetailsForm from './BeneficiaryProfileDetailsForm';
import { Dialog, DialogContent } from '@material-ui/core';
import Transition from 'components/animations/Transition';

const ClientInfo = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const clientId = location?.state?.clientId;
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!!clientId) {
      setIsLoading(true);
      fetchClientsDetails(clientId)
        .then((response) => {
          setClient(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }

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
            <BeneficiaryProfileDetailsForm
              client={client}
              setClient={setClient}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item id='basicInfo'>
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
                onClick={handleClickOpen}>
                <EditIcon color={'primary'} />
              </IconButton>
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
                    {client.firstName}
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
                    {client.lastName}
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
                    {client.firstName
                      ? client.firstName.split('')[0] + ' ' + client.lastName
                      : ''}
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
                    {client.referenceNumber}
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
                    {client.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default ClientInfo;
