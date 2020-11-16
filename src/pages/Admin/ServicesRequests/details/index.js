import React, { useEffect, useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import LoadingCircle from 'components/progress/LoadingCircle';
import { fetchServiceDetails, returnToClient } from 'apis/servicesAPI';
import ServiceRequestForm from '../../../../templates/services/ServiceRequestForm';
import CardFooter from 'components/card/CardFooter';
import Grid from '@material-ui/core/Grid';
import SubmitButton from 'components/buttons/SubmitButton';
import { useStyles as useStylesForm } from 'styles/Admin/questionFormStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SuccessSnackBar from 'components/snackbar/SuccessSnackBar';

const ServiceDetails = () => {
  const classes = useStyles();
  const formClasses = useStylesForm();
  const [serviceRequest, setServiceRequest] = useState({});
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const [isLoading, setIsLoading] = useState(false);
  const isNewService = !serviceId;
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);

  const validate = (serviceRequest) => {
    setIsError(false);
    if (!serviceRequest.comment) {
      setIsError(true);
      setMessage(t('commentValidation'));
      return false;
    }
    return true;
  };

  const handleReturnToClient = () => {
    if (!!validate(serviceRequest)) {
      returnToClient(serviceId, serviceRequest.comment)
        .then(() => {
          {
            setMessage(t('commentSubmitted'));
          }
        })
        .catch(() => { })
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchServiceDetails(serviceId)
      .then((response) => {
        setServiceRequest(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Typography component={'h4'} id={'post-service-page-header'}>
              {isNewService ? 'Add Service' : 'Edit Service'}
            </Typography>
          </CardHeader>
          <ServiceRequestForm
            serviceRequest={serviceRequest}
            setServiceRequest={setServiceRequest}
            viewOnly
          />
          <CardFooter className={classes.footerButtons}>
            <Grid
              item
              xs={6}
              className={[
                formClasses.answerButtonContainer,
                formClasses.saveQuestionBtn,
              ]}>
              <SubmitButton
                id='returnToClientButton'
                onClick={() => {
                  handleReturnToClient()
                }}
                buttonText={'return to client'}
                className={[
                  formClasses.answerButtons,
                  formClasses.buttonMargin,
                  formClasses.buttonMargin,
                ]}
              />
              <SubmitButton
                id='generateQuestionButton'
                onClick={() => { }}
                buttonText={'generate question'}
                className={[
                  formClasses.answerButtons,
                  formClasses.buttonMargin,
                  formClasses.buttonMargin,
                ]}
              />
            </Grid>
          </CardFooter>
          <SuccessSnackBar
            isError={isError}
            isSnackbarShown={!!message}
            closeSnackBar={() => setMessage('')}
            content={message}
          />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 16,
  },
  link: {
    textDecoration: 'none',
  },
}));

export default ServiceDetails;
